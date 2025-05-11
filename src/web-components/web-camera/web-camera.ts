import template from './web-camera.html?raw';

const markup = document.createElement('div');
markup.innerHTML = template;
const templateEl = markup.querySelector('template') as HTMLTemplateElement;

export interface WebCameraEvents {
    created: CustomEvent,
    mounted: CustomEvent,
    'capture-frame': CustomEvent<{ image: Blob | string }>
    'start-camera': CustomEvent<void>
    'stop-camera': CustomEvent<void>
    'error-camera': CustomEvent<string>
}

const acceptableCaptureTypes = ['png', 'jpg', 'jpeg', 'webp'] as const;
export interface WebCameraOptions {
    captureHeight: number
    captureWidth: number
    captureType: typeof acceptableCaptureTypes[number]
    captureEncoded: boolean
}

/*
-------------------------------------
TODO: figure out which camera to grab when on mobile
-------------------------------------
*/

/**
 * @example <web-camera capture-height="800" capture-width="600" capture-type="jpg"></web-camera>
 */
export class WebCamera extends HTMLElement {
    video: HTMLVideoElement;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    options: WebCameraOptions = {
        captureHeight: 600,
        captureWidth: 800,
        captureType: 'png',
        captureEncoded: false,
    };

    constructor() {
        super();
        // tried using shadow dom originally, but drawing to the canvas wasn't working
        this.appendChild(templateEl.content.cloneNode(true));
        this.video = this.querySelector('video') ?? document.createElement('video');
        this.canvas = this.querySelector('canvas') ?? document.createElement('canvas');
        // Forcing the type b/c context is only null when "the context identifier is 
        // not supported, or the canvas has already been set to a different context mode."
        // https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas/getContext
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.emit('created');
    }

    get captureType() {
        const type = this.options.captureType || 'png';
        return `image/${type}`;
    }

    connectedCallback() {
        this.emit('mounted');
        const startStream = this.querySelector('.start-stream-actions button');
        if (startStream) {
            startStream.addEventListener('click', () => {
                this.startCamera();
            });
        }
        const captureFrame = this.querySelector('.capture-frame-actions button');
        if (captureFrame) {
            captureFrame.addEventListener('click', () => {
                this.captureFrame();
            });
        }
    }

    attributeChangedCallback(
        attribute: string,
        _previousValue: string,
        currentValue: string
    ) {
        if (attribute === 'capture-height' && !isNaN(Number(currentValue))) {
            this.options.captureHeight = Number(currentValue);
        }
        if (attribute === 'capture-width' && !isNaN(Number(currentValue))) {
            this.options.captureWidth = Number(currentValue);
        }
        if (attribute === 'capture-type') {
            this.setCaptureType(currentValue as WebCameraOptions['captureType']);
        }
        if (attribute === 'capture-encoded') {
            this.options.captureEncoded = (!currentValue || currentValue === 'true');
        }
    }

    /**
     * Programmatically set stream dimensions (alternative: set attrs)
     * @param height
     * @param width
     */
    setStreamDimensions(height: WebCameraOptions['captureHeight'], width: WebCameraOptions['captureWidth']) {
        this.options.captureHeight = height;
        this.options.captureWidth = width;
    }
    setCaptureType(type: WebCameraOptions['captureType']) {
        if (acceptableCaptureTypes.includes(type)) {
            this.options.captureType = type;
        }
    }
    setCaptureEncoded(type: boolean) {
        if (typeof type !== 'boolean') {
            console.warn('Cannot set captureEncoded option to non-boolean value');
            return;
        }
        this.options.captureEncoded = type;
    }

    /**
     * Emits a CustomEvent with the given name and possible data.
     * @param eventName {String} mounted, capture-frame, start-camera, stop-camera, error-camera
     */
    emit(eventName: string, detailMap: Record<string, unknown> | undefined = undefined) {
        this.dispatchEvent(new CustomEvent(eventName, { detail: detailMap }));
    }

    stream: MediaStream | null = null;
    startCamera() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                this.stream = stream; // for stopping later
                this.video.srcObject = stream;
                this.video.play();
                this.emit('start-camera');
            })
            .catch((error) => {
                console.error('Error accessing webcam:', error);
                this.emit('error-camera', { error });
            });
    }
    stopCamera() {
        if (!this.stream) {
            console.warn('stopCamera() called when no stream exists');
            return;
        }
        const tracks = this.stream.getTracks();
        tracks[0]?.stop();
        this.stream = null;
        this.emit('stop-camera');
    }

    captureFrame(): Promise<Blob | string> {
        this.canvas.height = this.options.captureHeight;
        this.canvas.width = this.options.captureWidth;
        this.context.drawImage(this.video, 0, 0, this.options.captureWidth, this.options.captureHeight);

        return new Promise(resolve => {
            if (this.options.captureEncoded) {
                const image = this.canvas.toDataURL(this.captureType);
                this.emit('capture-frame', { image });
                resolve(image);
            } else {
                this.canvas.toBlob((image) => {
                    if (image === null) {
                        console.error('Captured image blob was returned null');
                        return;
                    }
                    this.emit('capture-frame', { image });
                    resolve(image);
                }, this.captureType);
            }
        });
    }
}

customElements.define('web-camera', WebCamera);

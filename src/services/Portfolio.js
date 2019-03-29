import BaseRequestService from './BaseRequest';

const logError = (msg, thrown) => console.error(msg, thrown);

export default class PortfolioService extends BaseRequestService {
    constructor() {
        super();
        this.postsUrl = `${this.baseUrl}/media?filter[category_name]=portfolio`;
    }

    getMedia() {
        return this.request(this.postsUrl)
            .catch(thrown => logError('Error fetching posts', thrown));
    }
}
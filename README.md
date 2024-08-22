# AdamLeis.com

I finally finished the Astro.js version of my site. It's been a fun learning experience. I'll incrementally keep improving upon the site as I go along, and I'll *eventually* probably rebuild it again, but the major benefit is that the content will be in markdown, and therefore hypothetically easier to transfer.

Woot!

# 👥 Get Connected!

- [Facebook](https://www.facebook.com/people/Adam-Leis/pfbid023sf7k6XkbJ6kPcSVUHAiLcrF4iqFBdADZgBuV1hkrTcKgdZZ18RiNAW77fBkZjjvl/)
- [X](https://twitter.com/theNthAdam)
- [LinkedIn](https://www.linkedin.com/in/adam-leis-75018b23/)
- [GitHub](https://github.com/Made-of-Clay)

## Firebase Hosting Deployment

If `firebase` isn't globally installed in your node environment, run the following first ([initially recorded here](https://firebase.google.com/docs/cli#windows-npm)):

`npm i -g firebase-tools`

If it's already installed but only locally, prefix the deployment script with `npx `.

Then to deploy…

`firebase deploy --only hosting`

[Firebase Quickstart Guide](https://firebase.google.com/docs/hosting/quickstart)
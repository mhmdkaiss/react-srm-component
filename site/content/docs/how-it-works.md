---
layout: docs
title: How it works
description: Learn more details on how SRM works
group: how-it-works
aliases:
  - "/docs/how-it-works/"
  - "/how-it-works/"
toc: false
---

## How it works

SRM are react applications with extra perks. They can take props and mounted on a specific element. They are designed to be lazy or eagerly loaded into any other framework.

Building an SRM will produce several `.js` and `.css` files, all listed in the `asset-manifest.json` bundled along them.  
 The build folder content can then be served by a static server, keeping the folder structure and making sure all files are publicly accessible. A simple way to do so in production would be to use an [AWS S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html).

The `build/asset-manifest.json` file describes the entry points and assets to be fetched in order to use your SRM.  
 A direct url to this file will be required to load and run the SRM, as can be seen in [@robingoupil/ng-srm-wrapper](https://github.com/rgoupil/ng-srm-wrapper) or [@robingoupil/react-srm-wrapper](https://github.com/rgoupil/react-srm-wrapper).

## How it works

SRM are react applications with extra perks. They can take props and mounted on a specific element. They are designed to be lazy or eagerly loaded into any other framework.

Building an SRM will produce several `.js` and `.css` files, all listed in the `asset-manifest.json` bundled along them.  
 The build folder content can then be served by a static server, keeping the folder structure and making sure all files are publicly accessible. A simple way to do so in production would be to use an [AWS S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html).

The `build/asset-manifest.json` file describes the entry points and assets to be fetched in order to use your SRM.  
 A direct url to this file will be required to load and run the SRM, as can be seen in [@robingoupil/ng-srm-wrapper](https://github.com/rgoupil/ng-srm-wrapper) or [@robingoupil/react-srm-wrapper](https://github.com/rgoupil/react-srm-wrapper).

##### Example for `https://your-domain.com`: <!-- omit in toc -->

```
+-- /
|   +-- your-project/
|       +-- asset-manifest.json
|       +-- favicon.ico
|       +-- index.html
|       +-- static/
```

Asset manifest URL: `https://your-domain.com/your-project/asset-manifest.json`

# share-widget

Share widget built for version 4.x of the ArcGIS API for Javascript

![share-widget](https://github.com/ArcGIS/share-widget/blob/master/images/share-link.png)​

Link to repository of sample Web Map Application using Share Widget:
https://github.com/rslibed/share-widget

## Features:

1.  `MapView` and `SceneView` compatability
2.  Share map via URL
3.  Embed map with Iframe code
4.  Share item services, i.e. social media or e-mail
5.  Client-side projection for non-Web Mercator/non-WGS84 spatial references
6.  Customizable Share Items
    - _Default items: Facebook, Twitter, LinkedIn, and Email_
7.  Customizable Share Features (All features toggled on by default):
    - Copy URL to clipboard
    - Share Services, i.e. Social Media or Email
    - Shorten URL
    - Embed Map

***Note:** Share Widget uses Esri's Calcite CSS Styles.*

Calcite Web Documentation: https://esri.github.io/calcite-web/documentation/

## Share Widget

### Constructor:

#### new **Share(_properties?_)**

##### Property Overview:

| Property       | Type           | Summary                                             |
| -------------- | -------------- | --------------------------------------------------- |
| view           | View           | View which can be set with `MapView` or `SceneView` |
| shareItems     | []ShareItem    | To be set as array consisting of `ShareItem` class. |
| shareFeatures  | ShareFeatures  | To be set with `ShareFeatures` class.               |
| shareModalOpened| Boolean       | Property to toggle Share Modal                      |
| shareUrl       | String         | Share URL of web application. (Read-only)           |
| label          | String         | The widget's default label.                         |
| iconClass      | String         | The widget's default CSS icon class.                |
| shareViewModel | ShareViewModel | The view model for this widget.                     |

## Share Item

### Constructor:

#### new **ShareItem(_properties?_)**

##### Property Overview:

| Property    | Type   | Summary                                                                                                                                              |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| id          | string | Unique ID of share item service i.e. `facebook`, `twitter`, `linkedin`, `email`, etc.                                                                |
| name        | string | Name of Share Item.                                                                                                                                  |
| className   | string | Class name of share icon.                                                                                                                            |
| urlTemplate | string | URL template of share item. Consists of share service URL along with URL parameters i.e. `"https://pinterest.com/pin/create/bookmarklet?&url={url}"` |

## Share Features

### Constructor:

#### new **ShareFeatures(_properties?_)**

##### Property Overview:

| Property        | Type    | Summary                                                  |
| --------------- | ------- | -------------------------------------------------------- |
| copyToClipboard? | boolean | Set value to `false` to toggle Copy URL feature off.     |
| shareServices?   | boolean | Set value to `false` to toggle Share Items off.          |
| embedMap?        | boolean | Set value to `false` to toggle Embed Map feature off.    |
| shortenLink?     | boolean | Set value to `false` to toggle shorten link feature off. |

**Please note:** Both `copyToClipboard` and `shareServices` properties **cannot** be toggled off concurrently.

### **Examples:**

##### Default:

```
const share = new Share({
    view: this.view
});
```

##### Custom:

```
 const PINTEREST_ITEM = new ShareItem({
   id: "pinterest",
   name: "pinterest",
   className: "icon-social-pinterest",
   urlTemplate:
     "https://pinterest.com/pin/create/bookmarklet?&url={url}"
 });
 const REDDIT_ITEM = new ShareItem({
   id: "reddit",
   name: "Reddit",
   className: "icon-social-share",
   urlTemplate: "https://reddit.com/submit?url={url}"
 });
 const LINKED_IN = new ShareItem({
   id: "linkedin",
   name: "LinkedIn",
   className: "icon-social-linkedin",
   urlTemplate: "https://linkedin.com/shareArticle?url={url}"
 });

 const shareFeatures = new ShareFeatures({
   copyToClipboard: false,
   embedMap: false
 });

const share = new Share({
  view: this.view,
  shareFeatures: shareFeatures,
  shareItems: [PINTEREST_ITEM, REDDIT_ITEM, LINKED_IN]
});
```

## Resources

* [ArcGIS for JavaScript API Resource Center](http://help.arcgis.com/en/webapi/javascript/arcgis/index.html)
* [ArcGIS Blog](http://blogs.esri.com/esri/arcgis/)
* [twitter@esri](http://twitter.com/esri)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Licensing
Copyright 2018 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [LICENSE](https://github.com/ArcGIS/share-widget/blob/master/LICENSE) file.

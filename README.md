# share-widget

Share widget built for version 4.x of the ArcGIS API for Javascript

#### Features:

1.  Compatible with both `MapView` and `SceneView`
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

#### new **ShareWidget(_properties?_)**

##### Property Overview:

| Property       | Type           | Summary                                             |
| -------------- | -------------- | --------------------------------------------------- |
| view           | View           | View which can be set with `MapView` or `SceneView` |
| container      | HTMLDivElement | document.createElement("div")                       |
| shareItems?    | []ShareItem    | To be set as array consisting of `ShareItem` class. |
| shareFeatures? | ShareFeatures  | To be set with `ShareFeatures` class.               |

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
const share = new ShareWidget({
    view: this.view,
    container: document.createElement("div")
});
```

##### Custom:

```
 const PINTEREST_ITEM = new ShareItem({
   id: "pinterest",
   name: "pinterest",
   className: "icon-social-pinterest"
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

const share = new ShareWidget({
  view: this.view,
  container: document.createElement("div"),
  shareFeatures: shareFeatures,
  shareItems: [PINTEREST_ITEM, REDDIT_ITEM, LINKED_IN];
});
```

import Collection = require("esri/core/Collection");
import ShareItem = require("../Share/ShareItem");

export interface ShareItemCollection extends Collection<ShareItem> {
  items: ShareItem[];
}

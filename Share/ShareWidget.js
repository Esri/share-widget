/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!./Share/nls/resources", "dojo/keys", "esri/core/lang", "esri/core/watchUtils", "esri/core/Handles", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "Calcite/calcite-web", "./Share/ShareViewModel"], function (require, exports, __extends, __decorate, i18n, keys_1, lang_1, watchUtils, Handles, decorators_1, Widget, widget_1, Calcite, ShareViewModel) {
    "use strict";
    //----------------------------------
    //
    //  CSS Classes
    //
    //----------------------------------
    var CSS = {
        base: "esri-share",
        shareModalStyles: "esri-share__share-modal",
        shareButton: "esri-share__share-button",
        shareModal: {
            close: "esri-share__close",
            shareIframe: {
                iframeContainer: "esri-share__iframe-container",
                iframeTabSectionContainer: "esri-share__iframe-tab-section-container",
                iframeInputContainer: "esri-share__iframe-input-container",
                iframePreview: "esri-share__iframe-preview",
                iframeInput: "esri-share__iframe-input"
            },
            shareTabStyles: {
                tabSection: "esri-share__tab-section",
                iframeTab: "esri-share__iframe-tab-section"
            },
            header: {
                container: "esri-share__header-container",
                heading: "esri-share__heading"
            },
            main: {
                mainContainer: "esri-share__main-container",
                mainHeader: "esri-share__main-header",
                mainHR: "esri-share__hr",
                mainCopy: {
                    copyButton: "esri-share__copy-button",
                    copyContainer: "esri-share__copy-container",
                    copyClipboardUrl: "esri-share__copy-clipboard-url",
                    copyClipboardContainer: "esri-share__copy-clipboard-container",
                    copyClipboardIframe: "esri-share__copy-clipboard-iframe"
                },
                mainUrl: {
                    inputGroup: "esri-share__copy-url-group",
                    urlInput: "esri-share__url-input",
                    linkGenerating: "esri-share--link-generating"
                },
                mainShare: {
                    shareContainer: "esri-share__share-container",
                    shareItem: "esri-share__share-item",
                    shareItemContainer: "esri-share__share-item-container",
                    shareIcons: {
                        facebook: "icon-social-facebook",
                        twitter: "icon-social-twitter",
                        googleplus: "icon-social-google-plus",
                        email: "icon-social-contact",
                        instagram: "icon-social-instagram",
                        linkedin: "icon-social-linkedin",
                        pinterest: "icon-social-pinterest",
                        geonet: "icon-social-geonet",
                        github: "icon-social-github",
                        rss: "icon-social-rss"
                    }
                },
                mainInputLabel: "esri-share__input-label"
            },
            calciteStyles: {
                modifier: "modifier-class",
                alignRight: "right",
                active: "is-active",
                modal: {
                    jsModal: "js-modal",
                    jsModalToggle: "js-modal-toggle",
                    modalContent: "modal-content",
                    modalOverlay: "modal-overlay"
                },
                tabs: {
                    jsTab: "js-tab",
                    jsTabSection: "js-tab-section",
                    tabGroup: "js-tab-group",
                    tabNav: "tab-nav",
                    tabTitle: "tab-title",
                    tabContents: "tab-contents",
                    tabSection: "tab-section"
                }
            }
        },
        icons: {
            widgetIcon: "esri-icon-share",
            svgIcon: "svg-icon",
            shortenIcon: "esri-share__shorten-icon",
            esriRotatingIcon: "esri-share--esri-rotating",
            copyIcon: "esri-share__copy-icon",
            esriLoader: "esri-share__loader"
        }
    };
    var Share = /** @class */ (function (_super) {
        __extends(Share, _super);
        function Share() {
            //----------------------------------
            //
            //  Private Variables
            //
            //----------------------------------
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Handles
            _this._handles = new Handles();
            //  DOM Nodes //
            // Modal overlay
            _this._modalOverlayNode = null;
            // Share Modal
            _this._shareModalNode = null;
            // Copy URL Button & Copy Iframe Button
            _this._copyUrlButtonNode = null;
            _this._copyIframeButtonNode = null;
            // Link Tab Node & Link Content Node
            _this._linkTabNode = null;
            _this._linkContentNode = null;
            // Embed Tab & Embed Content
            _this._embedTabNode = null;
            _this._embedContentNode = null;
            // Iframe Node
            _this._iframeNode = null;
            // URL Input & Iframe Input
            _this._iframeInputNode = null;
            _this._urlInputNode = null;
            //----------------------------------
            //
            //  Properties
            //
            //----------------------------------
            //----------------------------------
            //
            //  view
            //
            //----------------------------------
            _this.view = null;
            //----------------------------------
            //
            //  shareModalOpened
            //
            //----------------------------------
            _this.shareModalOpened = null;
            //----------------------------------
            //
            //  shareItems
            //
            //----------------------------------
            _this.shareItems = null;
            //----------------------------------
            //
            //  shareFeatures
            //
            //----------------------------------
            _this.shareFeatures = null;
            //----------------------------------
            //
            //  shareUrl - readOnly
            //
            //----------------------------------
            _this.shareUrl = null;
            //----------------------------------
            //
            //  iconClass and label - Expand Widget Support
            //
            //----------------------------------
            _this.iconClass = CSS.icons.widgetIcon;
            _this.label = i18n.widgetLabel;
            //----------------------------------
            //
            //  viewModel
            //
            //----------------------------------
            _this.viewModel = new ShareViewModel();
            return _this;
        }
        //----------------------------------
        //
        //  Lifecycle
        //
        //----------------------------------
        Share.prototype.postInitialize = function () {
            var _this = this;
            var embedMap = this.shareFeatures.embedMap;
            this.own([
                watchUtils.whenTrue(this, "view.ready", function () {
                    // Initialize calcite-web.js patterns for Modal and Tabs
                    Calcite.modal();
                    if (embedMap) {
                        Calcite.tabs();
                    }
                    _this._closeAccessibility();
                    if (embedMap) {
                        _this._tabAccessibility();
                    }
                    _this.own([
                        watchUtils.init(_this, "shareModalOpened", function () {
                            _this._detectWidgetToggle();
                        })
                    ]);
                })
            ]);
        };
        Share.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles = null;
            this._modalOverlayNode = null;
            this._shareModalNode = null;
            this._copyUrlButtonNode = null;
            this._copyIframeButtonNode = null;
            this._linkTabNode = null;
            this._linkContentNode = null;
            this._embedTabNode = null;
            this._embedContentNode = null;
            this._iframeNode = null;
            this._iframeInputNode = null;
            this._urlInputNode = null;
        };
        Share.prototype.render = function () {
            var shareModalNode = this._renderShareModal();
            return (widget_1.tsx("div", { class: CSS.base, "aria-labelledby": "modal" },
                widget_1.tsx("button", { class: this.classes(CSS.shareModal.calciteStyles.modal.jsModalToggle, CSS.icons.widgetIcon, CSS.shareButton), bind: this, onclick: this._toggleShareModal, onkeydown: this._toggleShareModal, "data-modal": "share-widget" }),
                shareModalNode));
        };
        Share.prototype._toggleShareModal = function () {
            this.shareModalOpened = !this.shareModalOpened;
        };
        Share.prototype._detectWidgetToggle = function () {
            if (this.shareModalOpened) {
                this._handles.add(Calcite.bus.emit("modal:open", {
                    id: this._modalOverlayNode.getAttribute("data-modal")
                }));
                this._generateUrl();
            }
            else {
                this._removeCopyTooltips();
            }
        };
        Share.prototype._generateUrl = function () {
            var _this = this;
            var embedMap = this.shareFeatures.embedMap;
            this.viewModel.generateUrl().then(function () {
                if (embedMap) {
                    _this._iframeNode = (widget_1.tsx("iframe", { class: CSS.shareModal.shareIframe.iframePreview, src: _this.shareUrl, tabIndex: "-1", scrolling: "no" }));
                    _this.scheduleRender();
                }
            });
        };
        Share.prototype._copyUrlInput = function () {
            this._urlInputNode.select();
            document.execCommand("copy");
            if (this.shareFeatures.embedMap) {
                Calcite.removeClass(this._copyIframeButtonNode, "tooltip tooltip-top");
            }
            Calcite.addClass(this._copyUrlButtonNode, "tooltip tooltip-top");
        };
        Share.prototype._copyIframeInput = function () {
            this._iframeInputNode.select();
            document.execCommand("copy");
            Calcite.removeClass(this._copyUrlButtonNode, "tooltip tooltip-top");
            Calcite.addClass(this._copyIframeButtonNode, "tooltip tooltip-top");
        };
        Share.prototype._removeCopyTooltips = function () {
            var _a = this, _copyUrlButtonNode = _a._copyUrlButtonNode, _copyIframeButtonNode = _a._copyIframeButtonNode;
            var embedMap = this.shareFeatures.embedMap;
            if (_copyUrlButtonNode !== null && _copyIframeButtonNode !== null) {
                Calcite.removeClass(_copyUrlButtonNode, "tooltip tooltip-top");
                if (embedMap) {
                    this._iframeNode = null;
                    Calcite.removeClass(_copyIframeButtonNode, "tooltip tooltip-top");
                    this.scheduleRender();
                }
            }
        };
        Share.prototype._processShareItem = function (event) {
            var node = event.currentTarget;
            var shareItem = node["data-share-item"];
            var urlTemplate = shareItem.urlTemplate;
            var portalItem = this.get("view.map.portalItem");
            var title = portalItem
                ? lang_1.substitute({ title: portalItem.title }, i18n.urlTitle)
                : null;
            var summary = portalItem
                ? lang_1.substitute({ summary: portalItem.snippet }, i18n.urlSummary)
                : null;
            this._openUrl(this.shareUrl, title, summary, urlTemplate);
        };
        Share.prototype._openUrl = function (url, title, summary, urlTemplate) {
            var urlToOpen = lang_1.substitute({
                url: encodeURI(url),
                title: title,
                summary: summary
            }, urlTemplate);
            window.open(urlToOpen);
        };
        Share.prototype._tabAccessibility = function () {
            var _this = this;
            // ***** Calcite Tabs Accessibility *****
            // Allows to select focused tab option with Spacebar
            this._handles.add([
                Calcite.addEvent(this._linkTabNode, "keydown", function (event) {
                    var keyCode = event.keyCode;
                    //  When user focuses on tab option and presses Spacebar: 'aria-expanded' attribute and 'is-active' class toggled accordingly
                    if (keyCode === keys_1.SPACE) {
                        // Link Tab Option
                        Calcite.addClass(_this._linkTabNode, "is-active");
                        Calcite.removeClass(_this._embedTabNode, "is-active");
                        _this._linkTabNode.setAttribute("aria-expanded", "true");
                        _this._embedTabNode.setAttribute("aria-expanded", "false");
                        // Link Tab Content
                        Calcite.addClass(_this._linkContentNode, "is-active");
                        Calcite.removeClass(_this._embedContentNode, "is-active");
                        _this._linkContentNode.setAttribute("aria-expanded", "true");
                        _this._embedContentNode.setAttribute("aria-expanded", "false");
                    }
                }),
                Calcite.addEvent(this._embedTabNode, "keydown", function (event) {
                    var keyCode = event.keyCode;
                    if (keyCode === keys_1.SPACE) {
                        // Embed Tab Option
                        Calcite.addClass(_this._embedTabNode, "is-active");
                        Calcite.removeClass(_this._linkTabNode, "is-active");
                        _this._embedTabNode.setAttribute("aria-expanded", "true");
                        _this._linkTabNode.setAttribute("aria-expanded", "false");
                        // Embed Tab Content
                        _this._embedContentNode.setAttribute("aria-expanded", "true");
                        _this._linkContentNode.setAttribute("aria-expanded", "false");
                        Calcite.addClass(_this._embedContentNode, "is-active");
                        Calcite.removeClass(_this._linkContentNode, "is-active");
                    }
                })
            ]);
        };
        Share.prototype._closeAccessibility = function () {
            var _this = this;
            var _a = this.shareFeatures, embedMap = _a.embedMap, copyToClipboard = _a.copyToClipboard;
            this._handles.add([
                // *** CLOSE MODAL ***
                // Sets _iframeNode and shareModalOpened to null when user uses escape key to exit modal
                Calcite.bus.on("keyboard:escape", function () {
                    _this.shareModalOpened = false;
                    if (copyToClipboard) {
                        Calcite.removeClass(_this._copyUrlButtonNode, "tooltip tooltip-top");
                    }
                    if (embedMap) {
                        _this._iframeNode = null;
                        Calcite.removeClass(_this._copyIframeButtonNode, "tooltip tooltip-top");
                    }
                    _this.scheduleRender();
                }),
                // Allows user to click overlay to close Share Modal
                Calcite.addEvent(this._modalOverlayNode, "click", function () {
                    _this.shareModalOpened = false;
                    if (embedMap) {
                        _this._iframeNode = null;
                        if (copyToClipboard) {
                            Calcite.removeClass(_this._copyUrlButtonNode, "tooltip tooltip-top");
                        }
                        Calcite.removeClass(_this._copyIframeButtonNode, "tooltip tooltip-top");
                    }
                    _this.scheduleRender();
                    Calcite.bus.emit("modal:close", {
                        id: _this._modalOverlayNode.getAttribute("data-modal")
                    });
                }),
                // Prevents event bubbling up to parent container when modal is clicked
                Calcite.addEvent(this._shareModalNode, "click", function (event) {
                    event.stopPropagation();
                })
            ]);
        };
        // Render Nodes
        Share.prototype._renderShareModal = function () {
            var modalContainerNode = this._renderModalContainer();
            return (widget_1.tsx("div", { class: this.classes(CSS.shareModal.calciteStyles.modal.jsModal, CSS.shareModal.calciteStyles.modal.modalOverlay, CSS.shareModal.calciteStyles.modifier), bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_modalOverlayNode", "data-modal": "share-widget" }, modalContainerNode));
        };
        Share.prototype._renderModalContainer = function () {
            var modalContentNode = this._renderModalContent();
            return (widget_1.tsx("div", { class: this.classes(CSS.shareModalStyles, CSS.shareModal.calciteStyles.modal.modalContent), role: "dialog", tabIndex: 0, bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_shareModalNode" },
                widget_1.tsx("h1", { class: CSS.shareModal.header.heading }, i18n.heading),
                widget_1.tsx("a", { bind: this, onclick: this._toggleShareModal, onkeydown: this._toggleShareModal, class: this.classes(CSS.shareModal.calciteStyles.modal.jsModalToggle, CSS.shareModal.calciteStyles.alignRight, CSS.shareModal.close), "aria-label": "close-modal", role: "button" },
                    widget_1.tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "21", height: "21", viewBox: "0 0 32 32", class: CSS.icons.svgIcon },
                        widget_1.tsx("path", { d: "M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z" }))),
                modalContentNode));
        };
        Share.prototype._renderModalContent = function () {
            var embedMap = this.shareFeatures.embedMap;
            var embedMapContentNode = this._renderEmbedMapContent();
            var sendALinkContentNode = this._renderSendALinkContent();
            return (widget_1.tsx("div", { class: CSS.shareModal.main.mainContainer },
                widget_1.tsx("div", { class: this.classes(CSS.shareModal.calciteStyles.modifier, CSS.shareModal.calciteStyles.tabs.tabGroup) },
                    embedMap ? (widget_1.tsx("nav", { class: CSS.shareModal.calciteStyles.tabs.tabNav },
                        widget_1.tsx("a", { class: this.classes(CSS.shareModal.calciteStyles.tabs.tabTitle, CSS.shareModal.calciteStyles.active, CSS.shareModal.calciteStyles.tabs.jsTab), bind: this, "data-node-ref": "_linkTabNode", afterCreate: widget_1.storeNode }, i18n.sendLink),
                        embedMap ? (widget_1.tsx("a", { class: this.classes(CSS.shareModal.calciteStyles.tabs.tabTitle, CSS.shareModal.calciteStyles.tabs.jsTab), bind: this, "data-node-ref": "_embedTabNode", afterCreate: widget_1.storeNode }, i18n.embedMap)) : null)) : null,
                    widget_1.tsx("section", { class: CSS.shareModal.calciteStyles.tabs.tabContents },
                        sendALinkContentNode,
                        embedMapContentNode))));
        };
        Share.prototype._renderShareItem = function (shareItem) {
            var name = shareItem.name, className = shareItem.className;
            return (widget_1.tsx("div", { class: this.classes(CSS.shareModal.main.mainShare.shareItem, name), key: name },
                widget_1.tsx("span", { class: className, title: name, onclick: this._processShareItem, onkeydown: this._processShareItem, role: "button", tabIndex: 0, "aria-label": name, bind: this, "data-share-item": shareItem })));
        };
        Share.prototype._renderShareItems = function () {
            var _this = this;
            var shareItems = this.shareItems;
            var shareIcons = CSS.shareModal.main.mainShare.shareIcons;
            // Assign class names of icons to share item
            shareItems.items.forEach(function (shareItem) {
                for (var key in shareIcons) {
                    if (key === shareItem.id) {
                        shareItem.className = shareIcons[shareItem.id];
                    }
                }
            });
            return shareItems
                .toArray()
                .map(function (shareItems) { return _this._renderShareItem(shareItems); });
        };
        Share.prototype._renderShareItemContainer = function () {
            var shareServices = this.shareFeatures.shareServices;
            var state = this.viewModel.state;
            var shareItemNodes = shareServices ? this._renderShareItems() : null;
            var shareItemNode = shareServices
                ? state === "ready" && shareItemNodes.length
                    ? [shareItemNodes]
                    : null
                : null;
            return (widget_1.tsx("div", null, shareServices ? (widget_1.tsx("div", { class: CSS.shareModal.main.mainShare.shareContainer, key: "share-container" },
                widget_1.tsx("h2", { class: CSS.shareModal.main.mainHeader }, i18n.subHeading),
                widget_1.tsx("div", { class: CSS.shareModal.main.mainShare.shareItemContainer }, shareItemNode))) : null));
        };
        Share.prototype._renderCopyUrl = function () {
            var copyToClipboard = this.shareFeatures.copyToClipboard;
            return (widget_1.tsx("div", null, copyToClipboard ? (widget_1.tsx("div", { class: CSS.shareModal.main.mainCopy.copyContainer, key: "copy-container" },
                widget_1.tsx("div", { class: CSS.shareModal.main.mainUrl.inputGroup },
                    widget_1.tsx("h2", { class: CSS.shareModal.main.mainHeader }, i18n.clipboard),
                    widget_1.tsx("div", { class: CSS.shareModal.main.mainCopy.copyClipboardContainer },
                        widget_1.tsx("div", { class: CSS.shareModal.main.mainCopy.copyClipboardUrl, bind: this, onclick: this._copyUrlInput, onkeydown: this._copyUrlInput, role: "button", tabIndex: 0, "data-node-ref": "_copyUrlButtonNode", afterCreate: widget_1.storeNode, "aria-label": "Copied" },
                            widget_1.tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", class: this.classes(CSS.icons.svgIcon, CSS.icons.copyIcon) },
                                widget_1.tsx("path", { d: "M22.801 0H10v6H2v26h20v-6h8V7.199L22.801 0zM20 24v6H4V8h8v8h8v8zm0-10h-6V8h.621L20 13.381V14zm8 10h-6V13.199L14.801 6H12V2h8v8h8v14zm0-16h-6V2h.621L28 7.381V8zM6 26h12v2H6v-2zm0-4h12v2H6v-2zm0-4h12v2H6v-2zm0-4h4v2H6v-2z" }))),
                        widget_1.tsx("input", { type: "text", class: CSS.shareModal.main.mainUrl.urlInput, bind: this, value: this.shareUrl, afterCreate: widget_1.storeNode, "data-node-ref": "_urlInputNode", readOnly: true }))))) : null));
        };
        Share.prototype._renderSendALinkContent = function () {
            var copyUrlNode = this._renderCopyUrl();
            var shareServicesNode = this._renderShareItemContainer();
            var _a = this.shareFeatures, shareServices = _a.shareServices, copyToClipboard = _a.copyToClipboard;
            var state = this.viewModel.state;
            return (widget_1.tsx("article", { class: this.classes(CSS.shareModal.calciteStyles.tabs.tabSection, CSS.shareModal.calciteStyles.tabs.jsTabSection, CSS.shareModal.calciteStyles.active, CSS.shareModal.shareTabStyles.tabSection), bind: this, "data-node-ref": "_linkContentNode", afterCreate: widget_1.storeNode }, state === "ready" ? (widget_1.tsx("div", null,
                shareServicesNode,
                !copyToClipboard || !shareServices ? null : (widget_1.tsx("hr", { class: CSS.shareModal.main.mainHR })),
                copyUrlNode)) : (widget_1.tsx("div", { class: CSS.icons.esriLoader }))));
        };
        Share.prototype._renderCopyIframe = function () {
            var _a = this.viewModel, embedCode = _a.embedCode, state = _a.state;
            return (widget_1.tsx("div", { class: CSS.shareModal.shareIframe.iframeInputContainer },
                widget_1.tsx("div", { class: CSS.shareModal.main.mainCopy.copyClipboardIframe, bind: this, onclick: this._copyIframeInput, onkeydown: this._copyIframeInput, role: "button", "aria-label": "Copied", "data-node-ref": "_copyIframeButtonNode", afterCreate: widget_1.storeNode, tabIndex: 0, readOnly: true },
                    widget_1.tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", class: this.classes(CSS.icons.svgIcon, CSS.icons.copyIcon) },
                        widget_1.tsx("path", { d: "M22.801 0H10v6H2v26h20v-6h8V7.199L22.801 0zM20 24v6H4V8h8v8h8v8zm0-10h-6V8h.621L20 13.381V14zm8 10h-6V13.199L14.801 6H12V2h8v8h8v14zm0-16h-6V2h.621L28 7.381V8zM6 26h12v2H6v-2zm0-4h12v2H6v-2zm0-4h12v2H6v-2zm0-4h4v2H6v-2z" }))),
                state === "ready" ? (widget_1.tsx("input", { class: CSS.shareModal.shareIframe.iframeInput, type: "text", tabindex: 0, value: embedCode, bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_iframeInputNode", readOnly: true })) : (widget_1.tsx("div", { class: CSS.shareModal.main.mainUrl.linkGenerating }, i18n.generateLink))));
        };
        Share.prototype._renderEmbedMapContent = function () {
            var embedMap = this.shareFeatures.embedMap;
            var state = this.viewModel.state;
            var copyIframeCodeNode = this._renderCopyIframe();
            return (widget_1.tsx("div", null, embedMap ? (widget_1.tsx("article", { class: this.classes(CSS.shareModal.calciteStyles.tabs.tabSection, CSS.shareModal.calciteStyles.tabs.jsTabSection, CSS.shareModal.shareTabStyles.tabSection, CSS.shareModal.shareTabStyles.iframeTab), bind: this, "data-node-ref": "_embedContentNode", afterCreate: widget_1.storeNode }, state === "ready" ? (widget_1.tsx("div", { key: "iframe-tab-section-container", class: CSS.shareModal.shareIframe.iframeTabSectionContainer },
                widget_1.tsx("h2", { class: CSS.shareModal.main.mainHeader }, i18n.clipboard),
                copyIframeCodeNode,
                widget_1.tsx("div", { class: CSS.shareModal.shareIframe.iframeContainer }, embedMap
                    ? state === "ready"
                        ? this._iframeNode
                        : null
                    : null))) : (widget_1.tsx("div", { class: CSS.icons.esriLoader })))) : null));
        };
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Share.prototype, "view", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.shareModalOpened"),
            widget_1.renderable()
        ], Share.prototype, "shareModalOpened", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.shareItems"),
            widget_1.renderable()
        ], Share.prototype, "shareItems", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.shareFeatures"),
            widget_1.renderable()
        ], Share.prototype, "shareFeatures", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.shareUrl"),
            widget_1.renderable()
        ], Share.prototype, "shareUrl", void 0);
        __decorate([
            decorators_1.property()
        ], Share.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], Share.prototype, "label", void 0);
        __decorate([
            widget_1.renderable([
                "viewModel.state",
                "viewModel.embedCode",
                "viewModel.shareFeatures"
            ]),
            decorators_1.property({
                type: ShareViewModel
            })
        ], Share.prototype, "viewModel", void 0);
        __decorate([
            widget_1.accessibleHandler()
        ], Share.prototype, "_toggleShareModal", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Share.prototype, "_copyUrlInput", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Share.prototype, "_copyIframeInput", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Share.prototype, "_processShareItem", null);
        Share = __decorate([
            decorators_1.subclass("Share")
        ], Share);
        return Share;
    }(decorators_1.declared(Widget)));
    return Share;
});
//# sourceMappingURL=ShareWidget.js.map
/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

// dojo
import i18n = require("dojo/i18n!./Share/nls/resources");
import { SPACE } from "dojo/keys";

// esri.core
import Collection = require("esri/core/Collection");
import { substitute } from "esri/core/lang";
import watchUtils = require("esri/core/watchUtils");
import Handles = require("esri/core/Handles");

// esri.core.accessorSupport
import {
  subclass,
  declared,
  property,
  aliasOf
} from "esri/core/accessorSupport/decorators";

// esri.views
import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");

// esri.widgets
import Widget = require("esri/widgets/Widget");

//esri.widgets.support
import {
  accessibleHandler,
  renderable,
  tsx,
  storeNode
} from "esri/widgets/support/widget";

// calcite-web
import Calcite = require("Calcite/calcite-web");

// View Model
import ShareViewModel = require("./Share/ShareViewModel");

// Share Item
import ShareItem = require("./Share/ShareItem");

// ShareFeatures
import ShareFeatures = require("./Share/ShareFeatures");

//----------------------------------
//
//  CSS Classes
//
//----------------------------------

const CSS = {
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

@subclass("Share")
class Share extends declared(Widget) {
  //----------------------------------
  //
  //  Private Variables
  //
  //----------------------------------

  // Handles
  private _handles: Handles = new Handles();

  //  DOM Nodes //
  // Modal overlay
  private _modalOverlayNode: HTMLElement = null;

  // Share Modal
  private _shareModalNode: HTMLElement = null;

  // Copy URL Button & Copy Iframe Button
  private _copyUrlButtonNode: HTMLElement = null;
  private _copyIframeButtonNode: HTMLElement = null;

  // Link Tab Node & Link Content Node
  private _linkTabNode: HTMLElement = null;
  private _linkContentNode: HTMLElement = null;

  // Embed Tab & Embed Content
  private _embedTabNode: HTMLElement = null;
  private _embedContentNode: HTMLElement = null;

  // Iframe Node
  private _iframeNode: HTMLIFrameElement = null;

  // URL Input & Iframe Input
  private _iframeInputNode: HTMLInputElement = null;
  private _urlInputNode: HTMLInputElement = null;

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

  @aliasOf("viewModel.view") view: MapView | SceneView = null;

  //----------------------------------
  //
  //  shareModalOpened
  //
  //----------------------------------
  @aliasOf("viewModel.shareModalOpened")
  @renderable()
  shareModalOpened: boolean = null;

  //----------------------------------
  //
  //  shareItems
  //
  //----------------------------------

  @aliasOf("viewModel.shareItems")
  @renderable()
  shareItems: Collection<ShareItem> = null;

  //----------------------------------
  //
  //  shareFeatures
  //
  //----------------------------------
  @aliasOf("viewModel.shareFeatures")
  @renderable()
  shareFeatures: ShareFeatures = null;

  //----------------------------------
  //
  //  shareUrl - readOnly
  //
  //----------------------------------

  @aliasOf("viewModel.shareUrl")
  @renderable()
  shareUrl: string = null;

  //----------------------------------
  //
  //  iconClass and label - Expand Widget Support
  //
  //----------------------------------

  @property() iconClass = CSS.icons.widgetIcon;
  @property() label = i18n.widgetLabel;

  //----------------------------------
  //
  //  viewModel
  //
  //----------------------------------

  @renderable([
    "viewModel.state",
    "viewModel.embedCode",
    "viewModel.shareFeatures"
  ])
  @property({
    type: ShareViewModel
  })
  viewModel: ShareViewModel = new ShareViewModel();

  //----------------------------------
  //
  //  Lifecycle
  //
  //----------------------------------

  postInitialize() {
    const { embedMap } = this.shareFeatures;
    this.own([
      watchUtils.whenTrue(this, "view.ready", () => {
        // Initialize calcite-web.js patterns for Modal and Tabs
        Calcite.modal();
        if (embedMap) {
          Calcite.tabs();
        }
        this._closeAccessibility();
        if (embedMap) {
          this._tabAccessibility();
        }
        this.own([
          watchUtils.init(this, "shareModalOpened", () => {
            this._detectWidgetToggle();
          })
        ]);
      })
    ]);
  }

  destroy() {
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
  }

  render() {
    const shareModalNode = this._renderShareModal();
    return (
      <div class={CSS.base} aria-labelledby="modal">
        <button
          class={this.classes(
            CSS.shareModal.calciteStyles.modal.jsModalToggle,
            CSS.icons.widgetIcon,
            CSS.shareButton
          )}
          bind={this}
          onclick={this._toggleShareModal}
          onkeydown={this._toggleShareModal}
          data-modal="share-widget"
        />
        {shareModalNode}
      </div>
    );
  }

  @accessibleHandler()
  private _toggleShareModal(): void {
    this.shareModalOpened = !this.shareModalOpened;
  }

  private _detectWidgetToggle(): void {
    if (this.shareModalOpened) {
      this._handles.add(
        Calcite.bus.emit("modal:open", {
          id: this._modalOverlayNode.getAttribute("data-modal")
        })
      );
      this._generateUrl();
    } else {
      this._removeCopyTooltips();
    }
  }

  private _generateUrl(): void {
    const { embedMap } = this.shareFeatures;
    this.viewModel.generateUrl().then(() => {
      if (embedMap) {
        this._iframeNode = (
          <iframe
            class={CSS.shareModal.shareIframe.iframePreview}
            src={this.shareUrl}
            tabIndex="-1"
            scrolling="no"
          />
        ) as HTMLIFrameElement;
        this.scheduleRender();
      }
    });
  }

  @accessibleHandler()
  private _copyUrlInput(): void {
    this._urlInputNode.select();
    document.execCommand("copy");
    if (this.shareFeatures.embedMap) {
      Calcite.removeClass(this._copyIframeButtonNode, "tooltip tooltip-top");
    }
    Calcite.addClass(this._copyUrlButtonNode, "tooltip tooltip-top");
  }

  @accessibleHandler()
  private _copyIframeInput(): void {
    this._iframeInputNode.select();
    document.execCommand("copy");
    Calcite.removeClass(this._copyUrlButtonNode, "tooltip tooltip-top");
    Calcite.addClass(this._copyIframeButtonNode, "tooltip tooltip-top");
  }

  private _removeCopyTooltips(): void {
    const { _copyUrlButtonNode, _copyIframeButtonNode } = this;
    const { embedMap } = this.shareFeatures;
    if (_copyUrlButtonNode !== null && _copyIframeButtonNode !== null) {
      Calcite.removeClass(_copyUrlButtonNode, "tooltip tooltip-top");
      if (embedMap) {
        this._iframeNode = null;
        Calcite.removeClass(_copyIframeButtonNode, "tooltip tooltip-top");
        this.scheduleRender();
      }
    }
  }

  @accessibleHandler()
  private _processShareItem(event: Event): void {
    const node = event.currentTarget as Element;
    const shareItem = node["data-share-item"] as ShareItem;
    const { urlTemplate } = shareItem;
    const portalItem = this.get("view.map.portalItem");
    const title = portalItem
      ? substitute({ title: portalItem.title }, i18n.urlTitle)
      : null;
    const summary = portalItem
      ? substitute({ summary: portalItem.snippet }, i18n.urlSummary)
      : null;
    this._openUrl(this.shareUrl, title, summary, urlTemplate);
  }

  private _openUrl(
    url: string,
    title: string,
    summary: string,
    urlTemplate: string
  ): void {
    const urlToOpen = substitute(
      {
        url: encodeURI(url),
        title,
        summary
      },
      urlTemplate
    );
    window.open(urlToOpen);
  }

  private _tabAccessibility(): void {
    // ***** Calcite Tabs Accessibility *****
    // Allows to select focused tab option with Spacebar
    this._handles.add([
      Calcite.addEvent(this._linkTabNode, "keydown", (event: KeyboardEvent) => {
        const { keyCode } = event;
        //  When user focuses on tab option and presses Spacebar: 'aria-expanded' attribute and 'is-active' class toggled accordingly
        if (keyCode === SPACE) {
          // Link Tab Option
          Calcite.addClass(this._linkTabNode, "is-active");
          Calcite.removeClass(this._embedTabNode, "is-active");
          this._linkTabNode.setAttribute("aria-expanded", "true");
          this._embedTabNode.setAttribute("aria-expanded", "false");

          // Link Tab Content
          Calcite.addClass(this._linkContentNode, "is-active");
          Calcite.removeClass(this._embedContentNode, "is-active");
          this._linkContentNode.setAttribute("aria-expanded", "true");
          this._embedContentNode.setAttribute("aria-expanded", "false");
        }
      }),
      Calcite.addEvent(
        this._embedTabNode,
        "keydown",
        (event: KeyboardEvent) => {
          const { keyCode } = event;
          if (keyCode === SPACE) {
            // Embed Tab Option
            Calcite.addClass(this._embedTabNode, "is-active");
            Calcite.removeClass(this._linkTabNode, "is-active");
            this._embedTabNode.setAttribute("aria-expanded", "true");
            this._linkTabNode.setAttribute("aria-expanded", "false");

            // Embed Tab Content
            this._embedContentNode.setAttribute("aria-expanded", "true");
            this._linkContentNode.setAttribute("aria-expanded", "false");
            Calcite.addClass(this._embedContentNode, "is-active");
            Calcite.removeClass(this._linkContentNode, "is-active");
          }
        }
      )
    ]);
  }

  private _closeAccessibility(): void {
    const { embedMap, copyToClipboard } = this.shareFeatures;
    this._handles.add([
      // *** CLOSE MODAL ***
      // Sets _iframeNode and shareModalOpened to null when user uses escape key to exit modal
      Calcite.bus.on("keyboard:escape", () => {
        this.shareModalOpened = false;
        if (copyToClipboard) {
          Calcite.removeClass(this._copyUrlButtonNode, "tooltip tooltip-top");
        }
        if (embedMap) {
          this._iframeNode = null;
          Calcite.removeClass(
            this._copyIframeButtonNode,
            "tooltip tooltip-top"
          );
        }
        this.scheduleRender();
      }),
      // Allows user to click overlay to close Share Modal
      Calcite.addEvent(this._modalOverlayNode, "click", () => {
        this.shareModalOpened = false;
        if (embedMap) {
          this._iframeNode = null;
          if (copyToClipboard) {
            Calcite.removeClass(this._copyUrlButtonNode, "tooltip tooltip-top");
          }

          Calcite.removeClass(
            this._copyIframeButtonNode,
            "tooltip tooltip-top"
          );
        }
        this.scheduleRender();
        Calcite.bus.emit("modal:close", {
          id: this._modalOverlayNode.getAttribute("data-modal")
        });
      }),
      // Prevents event bubbling up to parent container when modal is clicked
      Calcite.addEvent(this._shareModalNode, "click", (event: Event) => {
        event.stopPropagation();
      })
    ]);
  }

  // Render Nodes
  private _renderShareModal(): any {
    const modalContainerNode = this._renderModalContainer();
    return (
      <div
        class={this.classes(
          CSS.shareModal.calciteStyles.modal.jsModal,
          CSS.shareModal.calciteStyles.modal.modalOverlay,
          CSS.shareModal.calciteStyles.modifier
        )}
        bind={this}
        afterCreate={storeNode}
        data-node-ref="_modalOverlayNode"
        data-modal="share-widget"
      >
        {modalContainerNode}
      </div>
    );
  }

  private _renderModalContainer(): any {
    const modalContentNode = this._renderModalContent();
    return (
      <div
        class={this.classes(
          CSS.shareModalStyles,
          CSS.shareModal.calciteStyles.modal.modalContent
        )}
        role="dialog"
        tabIndex={0}
        bind={this}
        afterCreate={storeNode}
        data-node-ref="_shareModalNode"
      >
        <h1 class={CSS.shareModal.header.heading}>{i18n.heading}</h1>
        <a
          bind={this}
          onclick={this._toggleShareModal}
          onkeydown={this._toggleShareModal}
          class={this.classes(
            CSS.shareModal.calciteStyles.modal.jsModalToggle,
            CSS.shareModal.calciteStyles.alignRight,
            CSS.shareModal.close
          )}
          aria-label="close-modal"
          role="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 32 32"
            class={CSS.icons.svgIcon}
          >
            <path d="M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z" />
          </svg>
        </a>
        {modalContentNode}
      </div>
    );
  }

  private _renderModalContent(): any {
    const { embedMap } = this.shareFeatures;
    const embedMapContentNode = this._renderEmbedMapContent();
    const sendALinkContentNode = this._renderSendALinkContent();
    return (
      <div class={CSS.shareModal.main.mainContainer}>
        <div
          class={this.classes(
            CSS.shareModal.calciteStyles.modifier,
            CSS.shareModal.calciteStyles.tabs.tabGroup
          )}
        >
          {embedMap ? (
            <nav class={CSS.shareModal.calciteStyles.tabs.tabNav}>
              <a
                class={this.classes(
                  CSS.shareModal.calciteStyles.tabs.tabTitle,
                  CSS.shareModal.calciteStyles.active,
                  CSS.shareModal.calciteStyles.tabs.jsTab
                )}
                bind={this}
                data-node-ref="_linkTabNode"
                afterCreate={storeNode}
              >
                {i18n.sendLink}
              </a>
              {embedMap ? (
                <a
                  class={this.classes(
                    CSS.shareModal.calciteStyles.tabs.tabTitle,
                    CSS.shareModal.calciteStyles.tabs.jsTab
                  )}
                  bind={this}
                  data-node-ref="_embedTabNode"
                  afterCreate={storeNode}
                >
                  {i18n.embedMap}
                </a>
              ) : null}
            </nav>
          ) : null}
          <section class={CSS.shareModal.calciteStyles.tabs.tabContents}>
            {sendALinkContentNode}
            {embedMapContentNode}
          </section>
        </div>
      </div>
    );
  }

  private _renderShareItem(shareItem: ShareItem): any {
    const { name, className } = shareItem;
    return (
      <div
        class={this.classes(CSS.shareModal.main.mainShare.shareItem, name)}
        key={name}
      >
        <span
          class={className}
          title={name}
          onclick={this._processShareItem}
          onkeydown={this._processShareItem}
          role="button"
          tabIndex={0}
          aria-label={name}
          bind={this}
          data-share-item={shareItem}
        />
      </div>
    );
  }

  private _renderShareItems(): any[] {
    const { shareItems } = this;
    const { shareIcons } = CSS.shareModal.main.mainShare;
    // Assign class names of icons to share item
    shareItems.items.forEach((shareItem: any) => {
      for (const key in shareIcons) {
        if (key === shareItem.id) {
          shareItem.className = shareIcons[shareItem.id];
        }
      }
    });
    return shareItems
      .toArray()
      .map(shareItems => this._renderShareItem(shareItems));
  }

  private _renderShareItemContainer(): any {
    const { shareServices } = this.shareFeatures;
    const { state } = this.viewModel;
    const shareItemNodes = shareServices ? this._renderShareItems() : null;
    const shareItemNode = shareServices
      ? state === "ready" && shareItemNodes.length
        ? [shareItemNodes]
        : null
      : null;
    return (
      <div>
        {shareServices ? (
          <div
            class={CSS.shareModal.main.mainShare.shareContainer}
            key="share-container"
          >
            <h2 class={CSS.shareModal.main.mainHeader}>{i18n.subHeading}</h2>
            <div class={CSS.shareModal.main.mainShare.shareItemContainer}>
              {shareItemNode}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  private _renderCopyUrl(): any {
    const { copyToClipboard } = this.shareFeatures;
    return (
      <div>
        {copyToClipboard ? (
          <div
            class={CSS.shareModal.main.mainCopy.copyContainer}
            key="copy-container"
          >
            <div class={CSS.shareModal.main.mainUrl.inputGroup}>
              <h2 class={CSS.shareModal.main.mainHeader}>{i18n.clipboard}</h2>
              <div class={CSS.shareModal.main.mainCopy.copyClipboardContainer}>
                <div
                  class={CSS.shareModal.main.mainCopy.copyClipboardUrl}
                  bind={this}
                  onclick={this._copyUrlInput}
                  onkeydown={this._copyUrlInput}
                  role="button"
                  tabIndex={0}
                  data-node-ref="_copyUrlButtonNode"
                  afterCreate={storeNode}
                  aria-label="Copied"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    class={this.classes(CSS.icons.svgIcon, CSS.icons.copyIcon)}
                  >
                    <path d="M22.801 0H10v6H2v26h20v-6h8V7.199L22.801 0zM20 24v6H4V8h8v8h8v8zm0-10h-6V8h.621L20 13.381V14zm8 10h-6V13.199L14.801 6H12V2h8v8h8v14zm0-16h-6V2h.621L28 7.381V8zM6 26h12v2H6v-2zm0-4h12v2H6v-2zm0-4h12v2H6v-2zm0-4h4v2H6v-2z" />
                  </svg>
                </div>
                <input
                  type="text"
                  class={CSS.shareModal.main.mainUrl.urlInput}
                  bind={this}
                  value={this.shareUrl}
                  afterCreate={storeNode}
                  data-node-ref="_urlInputNode"
                  readOnly
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  private _renderSendALinkContent(): any {
    const copyUrlNode = this._renderCopyUrl();
    const shareServicesNode = this._renderShareItemContainer();
    const { shareServices, copyToClipboard } = this.shareFeatures;
    const { state } = this.viewModel;
    return (
      <article
        class={this.classes(
          CSS.shareModal.calciteStyles.tabs.tabSection,
          CSS.shareModal.calciteStyles.tabs.jsTabSection,
          CSS.shareModal.calciteStyles.active,
          CSS.shareModal.shareTabStyles.tabSection
        )}
        bind={this}
        data-node-ref="_linkContentNode"
        afterCreate={storeNode}
      >
        {state === "ready" ? (
          <div>
            {shareServicesNode}
            {!copyToClipboard || !shareServices ? null : (
              <hr class={CSS.shareModal.main.mainHR} />
            )}
            {copyUrlNode}
          </div>
        ) : (
          <div class={CSS.icons.esriLoader} />
        )}
      </article>
    );
  }

  private _renderCopyIframe(): any {
    const { embedCode, state } = this.viewModel;
    return (
      <div class={CSS.shareModal.shareIframe.iframeInputContainer}>
        <div
          class={CSS.shareModal.main.mainCopy.copyClipboardIframe}
          bind={this}
          onclick={this._copyIframeInput}
          onkeydown={this._copyIframeInput}
          role="button"
          aria-label="Copied"
          data-node-ref="_copyIframeButtonNode"
          afterCreate={storeNode}
          tabIndex={0}
          readOnly
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            class={this.classes(CSS.icons.svgIcon, CSS.icons.copyIcon)}
          >
            <path d="M22.801 0H10v6H2v26h20v-6h8V7.199L22.801 0zM20 24v6H4V8h8v8h8v8zm0-10h-6V8h.621L20 13.381V14zm8 10h-6V13.199L14.801 6H12V2h8v8h8v14zm0-16h-6V2h.621L28 7.381V8zM6 26h12v2H6v-2zm0-4h12v2H6v-2zm0-4h12v2H6v-2zm0-4h4v2H6v-2z" />
          </svg>
        </div>

        {state === "ready" ? (
          <input
            class={CSS.shareModal.shareIframe.iframeInput}
            type="text"
            tabindex={0}
            value={embedCode}
            bind={this}
            afterCreate={storeNode}
            data-node-ref="_iframeInputNode"
            readOnly
          />
        ) : (
          <div class={CSS.shareModal.main.mainUrl.linkGenerating}>
            {i18n.generateLink}
          </div>
        )}
      </div>
    );
  }

  private _renderEmbedMapContent(): any {
    const { embedMap } = this.shareFeatures;
    const { state } = this.viewModel;
    const copyIframeCodeNode = this._renderCopyIframe();
    return (
      <div>
        {embedMap ? (
          <article
            class={this.classes(
              CSS.shareModal.calciteStyles.tabs.tabSection,
              CSS.shareModal.calciteStyles.tabs.jsTabSection,
              CSS.shareModal.shareTabStyles.tabSection,
              CSS.shareModal.shareTabStyles.iframeTab
            )}
            bind={this}
            data-node-ref="_embedContentNode"
            afterCreate={storeNode}
          >
            {state === "ready" ? (
              <div
                key="iframe-tab-section-container"
                class={CSS.shareModal.shareIframe.iframeTabSectionContainer}
              >
                <h2 class={CSS.shareModal.main.mainHeader}>{i18n.clipboard}</h2>
                {copyIframeCodeNode}
                <div class={CSS.shareModal.shareIframe.iframeContainer}>
                  {embedMap
                    ? state === "ready"
                      ? this._iframeNode
                      : null
                    : null}
                </div>
              </div>
            ) : (
              <div class={CSS.icons.esriLoader} />
            )}
          </article>
        ) : null}
      </div>
    );
  }
}

export = Share;

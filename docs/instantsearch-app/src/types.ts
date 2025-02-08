import type { Renderer, Connector, WidgetFactory } from 'instantsearch.js';

/*
 * Parameters send only to the widget creator function
 * These parameters will be used by the widget creator to create the widget renderer and factory
 */
export type InstantsearchAppWidgetParams = {
  container: Element | string;
  // TODO: add the widget params
};

/*
 * Parameters send to the widget creator function
 * These parameters will be used by the widget creator to manage the widget logic
 */
export type InstantsearchAppConnectorParams = {
  // TODO: add the widget params
};

export type InstantsearchAppRenderState = {
  // TODO: add the render state params
};

type InstantsearchAppWidgetDescription = {
  $$type: 'ritchie.instantsearch-app';
  renderState: InstantsearchAppRenderState;
  indexRenderState: {
    instantsearchApp: {
      // TODO: add the return type of getRenderState
    };
  };
  indexUiState: {
    instantsearchApp: {
      // TODO: add the return type of getWidgetUiState
    };
  };
};

/*
 * Connector type, constructed from the Renderer and Connector parameters
 */
export type InstantsearchAppConnector = Connector<
  InstantsearchAppWidgetDescription,
  InstantsearchAppConnectorParams
>;

/*
 * Renderer type, constructed from the Renderer and Connector parameters
 */
export type InstantsearchAppRendererCreator = (
  widgetParams: InstantsearchAppWidgetParams
) => {
  render: Renderer<
    InstantsearchAppWidgetDescription['renderState'],
    InstantsearchAppConnectorParams
  >;
  dispose: () => void;
};

/*
 * Widget type, constructed from the Renderer, Connector and Widget parameters
 */
export type InstantsearchAppWidgetCreator = WidgetFactory<
  InstantsearchAppWidgetDescription & {
    $$widgetType: 'ritchie.instantsearch-app';
  },
  InstantsearchAppConnectorParams,
  InstantsearchAppWidgetParams
>;

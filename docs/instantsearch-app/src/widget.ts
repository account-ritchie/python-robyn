import { connectInstantsearchApp } from './connector';
import { createInstantsearchAppRenderer } from './renderer';
import type {
  InstantsearchAppWidgetCreator,
  InstantsearchAppConnectorParams,
  InstantsearchAppWidgetParams,
} from './types';

/*
 * Widget creator
 * Returns a widget instance
 */
export const instantsearchApp: InstantsearchAppWidgetCreator =
  function InstantsearchApp(widgetParams) {
    const rendererWidgetParams: InstantsearchAppWidgetParams = {
      container: widgetParams.container,
      // TODO: pick the widget-only parameters from the widgetParams
    };

    const { render, dispose } =
      createInstantsearchAppRenderer(rendererWidgetParams);

    const createWidget = connectInstantsearchApp(render, dispose);

    const connectorParams: InstantsearchAppConnectorParams = {
      // TODO: pick the connector-only parameters from the widgetParams
    };

    return {
      ...createWidget(connectorParams),
      $$widgetType: 'ritchie.instantsearch-app',
    };
  };

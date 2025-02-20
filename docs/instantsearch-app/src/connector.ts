import type { InstantsearchAppConnector } from './types';

/*
 * Creates the connector
 * The connector takes the renderer and the unmounter as parameters and returns a widget factory.
 * This factory is a plain function that takes the connectorParams as parameters and returns a widget.
 * This widget is defined as a plain JS object with methods that will be called during InstantSearch.js lifecycle.
 * Theses methods are of 2 types:
 * - Lifecycle methods (`init`, `render`, `dispose`)
 *   Are called at precise points during the InstantSearch.js global lifecycle.

 *   Can be called internally anytime by InstantSearch.
 */
export const connectInstantsearchApp: InstantsearchAppConnector =
  function connectInstantsearchApp(renderFn, unmountFn = () => {}) {
    return (widgetParams) => {
      const {
        // TODO: read from connector parameters
      } = widgetParams;

      return {
        $$type: 'ritchie.instantsearch-app',
        /*
         * Sets up the widget during the InstantSearch initialization.
         * It is called before the first search and is a good place to call the `renderFn` function to set up the initial DOM (a placeholder for example).
         */
        init(initOptions) {
          const { instantSearchInstance } = initOptions;

          renderFn(
            {
              ...this.getWidgetRenderState(initOptions),
              instantSearchInstance,
            },
            true
          );
        },

        /*
         * Re-render the widget with the new information from the search, including results.
         * This method is called each time we receive results from Algolia.
         */
        render(renderOptions) {
          const { instantSearchInstance } = renderOptions;

          renderFn(
            {
              ...this.getWidgetRenderState(renderOptions),
              instantSearchInstance,
            },
            false
          );
        },

        /*
         * Called when this widget is unmounted.
         * Can be used to remove refinements set by during this widget's initialization and life time.
         */
        dispose() {
          unmountFn();
        },

        /*
         * Derive a `uiState` for this widget based on the existing `uiState` and the search parameters applied.
         * This method is required for a widget to be taken in account for routing.
         * This method can be called internally anytime by InstantSearch and to avoid any issues they must be defined as pure functions.
         */
        getWidgetUiState(uiState, { searchParameters }) {
          return {
            ...uiState,
            instantsearchApp: {
              // TODO: add this widget's ui state
            },
          };
        },

        /*
         * It receives the current UiState and applied search parameters, and is
         * expected to return a new search parameters.
         * This method is required for a widget to be taken in account for routing.
         */
        getWidgetSearchParameters(searchParameters, { uiState }) {
          // add this widget's search parameters
          return searchParameters;
        },

        /*
         * Returns IndexRenderState of the current index component tree to build the render state of the whole app.
         * This method is required for a widget to be taken in account for routing.
         * This method can be called internally anytime by InstantSearch and to avoid any issues they must be defined as pure functions.
         */
        getRenderState(renderState, renderOptions) {
          return {
            ...renderState,
            instantsearchApp: {
              // TODO: call this.getWidgetRenderState(renderOptions), possibly nested per attribute
            },
          };
        },

        /*
         * Returns the render state of the current widget.
         * The render state will be passed to the `renderFn` function by the `init` and `render` methods.
         * This method can be called internally anytime by InstantSearch and to avoid any issues they must be defined as pure functions.
         */
        getWidgetRenderState({ results }) {
          if (!results) {
            // default rendering state without results
            return {
              widgetParams,
            };
          }

          // rendering state when there are results
          return {
            widgetParams,
          };
        },
      };
    };
  };

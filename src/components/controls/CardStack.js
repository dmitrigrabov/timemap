import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  Card,
  generateCardLayout,
} from "@forensic-architecture/design-system/dist/react";

import * as selectors from "../../selectors";
import { fetchMediaForEvent } from "../../actions";
import {
  getFilterIdxFromColorSet,
  getStaticFilterColorSet,
  appendFiltersToColoringSet,
} from "../../common/utilities";
import copy from "../../common/data/copy.json";
import { COLORING_ALGORITHM_MODE } from "../../common/constants";

class CardStack extends React.Component {
  constructor() {
    super();
    this.refs = {};
    this.refCardStack = React.createRef();
    this.refCardStackContent = React.createRef();
  }

  componentDidUpdate() {
    const isNarrative = !!this.props.narrative;

    if (isNarrative) {
      this.scrollToCard();
    }
  }

  scrollToCard() {
    const duration = 500;
    const element = this.refCardStack.current;
    const cardScroll = this.refs[this.props.narrative.current].current
      .offsetTop;

    const start = element.scrollTop;
    const change = cardScroll - start;
    let currentTime = 0;
    const increment = 20;

    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t -= 1;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animateScroll = function () {
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) setTimeout(animateScroll, increment);
    };
    animateScroll();
  }

  renderCards(events, selections) {
    const { mode, colors, defaultColor } = this.props.coloringConfig;
    const { filters, coloringSet } = this.props;
    // if no selections provided, select all
    if (!selections) {
      selections = events.map((e) => true);
    }
    this.refs = [];

    const updatedColoringSet =
      mode === COLORING_ALGORITHM_MODE.STATIC
        ? appendFiltersToColoringSet(filters, coloringSet)
        : coloringSet;

    const updatedFilterColors =
      mode === COLORING_ALGORITHM_MODE.STATIC
        ? getStaticFilterColorSet(filters, updatedColoringSet, defaultColor)
        : colors;

    const generateTemplate =
      generateCardLayout[this.props.cardUI.layout.template];

    return events.map((event, idx) => {
      const thisRef = React.createRef();
      this.refs[idx] = thisRef;
      const evtToUpdate = { ...event };

      if (this.props.features.FETCH_EXTERNAL_MEDIA) {
        this.props.actions
          .fetchMediaForEvent("CV_A12")
          .then((data) => (evtToUpdate.media = data));
      }

      return (
        <Card
          ref={thisRef}
          content={generateTemplate({
            event,
            colors: updatedFilterColors,
            coloringSet: updatedColoringSet,
            getFilterIdxFromColorSet,
          })}
          language={this.props.language}
          isLoading={this.props.isLoading}
          isSelected={selections[idx]}
        />
      );
    });
  }

  renderSelectedCards() {
    const { selected } = this.props;

    if (selected.length > 0) {
      return this.renderCards(selected);
    }
    return null;
  }

  renderNarrativeCards() {
    const { narrative } = this.props;
    const showing = narrative.steps;

    const selections = showing.map((_, idx) => idx === narrative.current);

    return this.renderCards(showing, selections);
  }

  renderCardStackHeader() {
    const headerLang = copy[this.props.language].cardstack.header;

    return (
      <div
        id="card-stack-header"
        className="card-stack-header"
        onClick={() => this.props.onToggleCardstack()}
      >
        <button className="side-menu-burg is-active">
          <span />
        </button>
        <p className="header-copy top">
          {`${this.props.selected.length} ${headerLang}`}
        </p>
      </div>
    );
  }

  renderCardStackContent() {
    return (
      <div id="card-stack-content" className="card-stack-content">
        <ul>{this.renderSelectedCards()}</ul>
      </div>
    );
  }

  renderNarrativeContent() {
    return (
      <div
        id="card-stack-content"
        className="card-stack-content"
        ref={this.refCardStackContent}
      >
        <ul>{this.renderNarrativeCards()}</ul>
      </div>
    );
  }

  render() {
    const { isCardstack, selected, narrative, timelineDims } = this.props;
    // TODO: make '237px', which is the narrative header, less hard-coded
    const height = `calc(100% - 237px - ${timelineDims.height}px)`;
    if (selected.length > 0) {
      if (!narrative) {
        return (
          <div
            id="card-stack"
            className={`card-stack
            ${isCardstack ? "" : " folded"}`}
          >
            {this.renderCardStackHeader()}
            {this.renderCardStackContent()}
          </div>
        );
      } else {
        return (
          <div
            id="card-stack"
            ref={this.refCardStack}
            className={`card-stack narrative-mode
            ${isCardstack ? "" : " folded"}`}
            style={{ height }}
          >
            {this.renderNarrativeContent()}
          </div>
        );
      }
    }

    return <div />;
  }
}

function mapStateToProps(state) {
  return {
    narrative: selectors.selectActiveNarrative(state),
    selected: selectors.selectSelected(state),
    sourceError: state.app.errors.source,
    language: state.app.language,
    isCardstack: state.app.flags.isCardstack,
    isLoading: state.app.flags.isFetchingSources,
    cardUI: state.ui.card,
    coloringConfig: state.ui.coloring,
    coloringSet: state.app.associations.coloringSet,
    filters: selectors.getFilters(state),
    features: state.features,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchMediaForEvent }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardStack);

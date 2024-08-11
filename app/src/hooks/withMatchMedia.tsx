/**
 * withMatchMedia
 *
 * Provides attributes to the child identifying viewport definitions: tablet, mobile, desktop, etc.
 *
 * The media watchers live 'outside' the component so that they are shared and pervasive across the application.
 *
 * The individual components then add listeners to the various break points.
 */

import React, { useEffect, useMemo, useState } from 'react';

export const media = {
  desktopMinWidth: '1100px',
  mobileMaxWidth: '860px',
  tabletMinWidth: '860px',
  desktopSmallMinWidth: '1200px',
  desktopLargeMinWidth: '1520px',
};


const mediaBreakpoints = {
  mobile: `(max-width: ${media.mobileMaxWidth})`,
  tablet: `(min-width: ${media.tabletMinWidth}) and (max-width: ${media.desktopSmallMinWidth})`,
  smallDesktop: `(min-width: ${media.desktopSmallMinWidth}) and (max-width: ${media.desktopLargeMinWidth})`,
  desktop: `(min-width: ${media.desktopLargeMinWidth})`,
};

const breakPoints: {[x: string]: {media: string, matchMedia: any}} = {
  isMobile: {
    media: mediaBreakpoints.mobile,
    matchMedia: window.matchMedia && window.matchMedia(mediaBreakpoints.mobile),
  },
  isDesktop: {
    media: mediaBreakpoints.desktop,
    matchMedia:
      window.matchMedia && window.matchMedia(mediaBreakpoints.desktop),
  },
  isTablet: {
    media: mediaBreakpoints.tablet,
    matchMedia: window.matchMedia && window.matchMedia(mediaBreakpoints.tablet),
  },
  isSmallDesktop: {
    media: mediaBreakpoints.smallDesktop,
    matchMedia: window.matchMedia && window.matchMedia(mediaBreakpoints.smallDesktop),
  }
};

// loops through our breakpoints to evaluate if any of them currently match
const evaluateCurrentMediaMatches = () =>
  Object.keys(breakPoints).reduce(
    (state, device) => ({
      ...state,
      [device]: breakPoints[device].matchMedia.matches,
    }),
    {},
  );

export type MatchMediaType = {
  isDesktop?: boolean;
  isTablet?: boolean;
  isMobile?: boolean;
  isSmallDesktop?: boolean;
};

export const withMatchMedia =
  <P,>(WrappedComponent: React.ComponentType<P & MatchMediaType>) =>
  (props: P) => {
    const [evaluations, setEvaluations] = useState<{
      isMobile?: boolean;
      isTablet?: boolean;
      isDesktop?: boolean;
      isSmallDesktop?: boolean;
    }>({});

    const handleMediaChange = () => {
      setEvaluations(evaluateCurrentMediaMatches());
    };

    useEffect(() => {
      Object.keys(breakPoints).forEach((key) => {
        breakPoints[key].matchMedia.addEventListener(
          'change',
          handleMediaChange,
        );
      });
      setEvaluations(evaluateCurrentMediaMatches());

      return () => {
        Object.keys(breakPoints).forEach((key) => {
          breakPoints[key].matchMedia.removeEventListener(
            'change',
            handleMediaChange,
          );
        });
      };
    }, []);

    const isHeadless = useMemo(() => {
      return !Object.values(evaluations).some(Boolean);
    }, [evaluations]);

    return (
      <WrappedComponent
        {...props}
        isDesktop={isHeadless || evaluations.isDesktop}
        isTablet={evaluations.isTablet}
        isMobile={evaluations.isMobile}
        isSmallDesktop={evaluations.isSmallDesktop}
      />
    );
  };

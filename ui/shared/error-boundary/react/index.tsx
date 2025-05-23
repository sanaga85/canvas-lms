/*
 * Copyright (C) 2019 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React, {type PropsWithChildren, type ReactElement} from 'react'
import * as Sentry from '@sentry/react'
import type {FallbackRender} from '@sentry/react/types/errorboundary.d'

export type ErrorBoundaryProps = PropsWithChildren<{
  errorComponent: FallbackRender | ReactElement
  beforeCapture?: Sentry.ErrorBoundaryProps['beforeCapture']
}>

type ErrorBoundaryState = {
  error: Error | null
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static getDerivedStateFromError(error: Error) {
    return {error}
  }

  // @ts-expect-error
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo)
  }

  state: ErrorBoundaryState = {error: null}

  render() {
    // If the <Sentry.ErrorBoundary> threw an error, handle it ourselves
    if (this.state.error) {
      if (typeof this.props.errorComponent === 'function') {
        // `componentStack` and `eventId` are only used by Sentry's ErrorBoundary, but we need to pass in `null` to comply with the unnecessarily strict type
        return this.props.errorComponent({
          error: this.state.error,
          // @ts-expect-error
          componentStack: null,
          // @ts-expect-error
          eventId: null,
          resetError: () => this.setState({error: null}),
        })
      } else {
        return this.props.errorComponent
      }
    }

    return (
      <Sentry.ErrorBoundary
        fallback={this.props.errorComponent}
        beforeCapture={this.props.beforeCapture}
      >
        {this.props.children}
      </Sentry.ErrorBoundary>
    )
  }
}

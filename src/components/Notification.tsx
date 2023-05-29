import { Component } from 'react'
import { Notification as NotificationType } from 'store/types'

type NotificationProps = {
  notifications: NotificationType[]
  onToggle: () => void
  isNotification: boolean
}

type NotificationState = {
  isExtended: boolean
}

export default class Notification extends Component<
  NotificationProps,
  NotificationState
> {
  constructor(props: NotificationProps) {
    super(props)
    this.state = {
      isExtended: false
    }
  }

  toggleDetails() {
    this.setState({ isExtended: !this.state.isExtended })
  }

  render() {
    if (!this.props.notifications) {
      return null
    }

    const notificationsToRender = this.props.notifications.filter(
      n => !('isRead' in n && n.isRead)
    )

    if (notificationsToRender.length > 0) {
      return (
        <div className="notification-wrapper">
          {this.props.notifications.map((notification, idx) => {
            const { type, message, items } = notification

            return (
              <div
                className="notification"
                onClick={() => this.toggleDetails()}
                key={idx}
              >
                <button
                  onClick={this.props.onToggle}
                  className="side-menu-burg over-white is-active"
                >
                  <span />
                </button>

                <div>
                  <div className={`message ${type}`}>{message}</div>
                  <div className={`details ${this.state.isExtended}`}>
                    {items !== null ? (
                      <div>
                        {items.map((item, idx) => {
                          if (item.error) {
                            return <p key={idx}>{item.error.message}</p>
                          }
                          return null
                        })}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    }
    return <div />
  }
}

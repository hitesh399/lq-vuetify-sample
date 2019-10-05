import Vue from 'vue'
import { EventBus } from 'lq-form'


class Message {
  success (message, options) {
    this._show(message, 'success', options)
  }
  error (message, options) {
    this._show(message, 'error', options)
  }
  warning(message, options) {
    this._show(message, 'warning', options)
  }
  info (message, options) {
    this._show(message, 'info', options)
  }
  _show(message, color, options) {
    EventBus.$emit('queue-message-show', {
      message,
      color,
      options
    });
  }
}

const MessagePlugin = {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$message',   {value: new Message() });
  }
}

Vue.use(MessagePlugin)
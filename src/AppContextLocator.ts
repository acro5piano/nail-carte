import { Context } from 'almin'
import { History } from 'history'

interface AppContextLocator {
  context: Context<any>
  history: History
}

/**
 * Locator is a singleton.
 */
let _context: Context<any> | null = null
let _history: History | null = null
export const appContextLocator: AppContextLocator = {
  get context(): Context<any> {
    return _context
  },
  set context(context: Context<any>) {
    _context = context
  },
  get history(): History {
    return _history
  },
  set history(history: History) {
    _history = history
  },
}

export const BrowserOnlyReactJson = (props) => {
    if (typeof window === "undefined") {
      return null
    }
    const ReactJson = require("react-json-view").default
    return <ReactJson {...props} />
  }
  
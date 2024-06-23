interface StringOnlyObject {
  [key: string]: string;
}

export const addStyles = (element: HTMLElement, styles: StringOnlyObject) => Object.assign(element.style, styles)


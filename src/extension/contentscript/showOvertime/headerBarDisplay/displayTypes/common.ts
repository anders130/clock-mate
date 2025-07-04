import browser from 'webextension-polyfill';
import { ERROR_MSGS } from '../../../common/constants';
import { LightingMode } from '../../../common/enums/lightingMode';
import { BUTTON_ID, CSS_CLASSES } from '../../constants';
import { HEADER_ID, REFRESH_ICON_ID } from '../constants';

export default class Common {
    /**
     * Creates a new HTML element with the specified attributes and the content placed inside
     * @param tagName       the name of the HTML-Tag, e.g: <div> -> 'div'
     * @param attributes    Object - key: attribute name, value: value of the attribute
     * @param content       the nodes or strings to be placed inside of the element
     * @returns the composed HTMLElement with given attributes and content
     */
    public static createRichElement(
        tagName: string,
        attributes: object,
        ...content: HTMLElement[] | string[] | []
    ): HTMLElement {
        const element = document.createElement(tagName);
        if (attributes) {
            for (const [attr, value] of Object.entries(attributes)) {
                element.setAttribute(attr, value);
            }
        }
        if (content && content.length) {
            element.append(...content);
        }
        return element;
    }

    /**
     * Creates HTML elements which can be placed inside the display. Styling will be adjusted
     * based on given parameters.
     * @param displayText   the text to place inside of the display
     * @param loading       if true show a loading animation and disable button
     * @returns an array of HTML elements: first element is a button, second element is a heading
     */
    public static createInnerHTMLElements(
        displayText: string,
        loading: boolean,
    ): [HTMLElement, HTMLElement] {
        const refreshImage = this.createRichElement('img', {
            id: REFRESH_ICON_ID,
            src: this.getRefreshIconURL(),
        });

        const button = this.createRichElement(
            'button',
            {
                id: BUTTON_ID,
                class: CSS_CLASSES.BUTTON,
                disabled: loading ? 'true' : 'false',
            },
            refreshImage,
        );

        const headline = this.createRichElement(
            'h3',
            { class: CSS_CLASSES.DISPLAY_LINE },
            displayText ?? ERROR_MSGS.UNKNOWN,
        );

        return [button, headline];
    }

    /**
     * Determines whether the page is displayed in a light or dark mode.
     * @returns the lighting mode
     */
    public static getLightingMode(): LightingMode {
        const header =
            document.getElementById(HEADER_ID) ?? document.getElementsByTagName('body')[0];
        if (!header) return LightingMode.Light; // default to lightmode if header not available

        // the rgb value of the header, is normally either white or dark grey/black
        const rgbColor = window.getComputedStyle(header, null).getPropertyValue('background-color');

        // convert the rgb string representation into the red green and blue values
        const colors = rgbColor
            .replace('rgb(', '')
            .replace('(', '')
            .split(',')
            .map((value) => parseInt(value.trim(), 10));

        // luminance calculation according to: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-procedure
        const luminance = 0.2126 * colors[0] + 0.7152 * colors[1] + 0.0722 * colors[2];

        if (luminance > 128) return LightingMode.Light;
        else return LightingMode.Dark;
    }

    /**
     * Returns the according CSS class for the given parameter
     * @param lightingMode    the current lighting mode of the page
     */
    public static getLightingClassName(lightingMode: LightingMode): string {
        if (lightingMode == LightingMode.Light) return CSS_CLASSES.LIGHT_MODE;
        return CSS_CLASSES.DARK_MODE;
    }

    /**
     * Get the URL for the refresh icon based on the current LightingMode (light/dark) of the page.
     * @returns the URL
     */
    private static getRefreshIconURL(): string {
        if (this.getLightingMode() == LightingMode.Light) {
            return browser.runtime.getURL('./assets/refresh-light.svg');
        } else {
            return browser.runtime.getURL('./assets/refresh-dark.svg');
        }
    }
}

import { constStrings, givenStrings } from '../utils/constants';
import Navigation from '../utils/navigation';
import Common from './common';
import Settings from '../../common/utils/settings';
import { DisplayFormat } from '../types/display';

/**
 * The floating display is an HTML-Element which is floating above all other page
 * content and not properly part of it. It should be used as an initial display while
 * the page is loading.
 */
export default class Floating {
    public static async addFloatingDisplay(displayState: DisplayFormat) {
        if (!(await Settings.displayIsEnabled())) {
            return;
        }

        const HTMLElements = Common.createInnerHTMLElements(
            displayState.text,
            displayState.loading,
            false,
        );

        // main page element is the (almost) only one loaded when DOM is loaded
        const canvas =
            document.getElementById(givenStrings.mainPageElement1) ??
            document.getElementById(givenStrings.mainPageElement2);
        if (!canvas) return; // unable to insert floating display, when canvas not available

        canvas.insertAdjacentElement(
            'beforebegin',
            Common.createRichElement(
                'div',
                {
                    class:
                        `${constStrings.cssClasses.floatingDisplay} ${Navigation.getPageVariant().toString().toLowerCase()} ` +
                        Common.getLightingClassName(Common.getLightingMode()),
                    id: constStrings.floatingDisplayID,
                    style: displayState.loading ? ' opacity: 0.5;' : '',
                },
                ...HTMLElements, // spread syntax to expand array
            ),
        );
    }

    public static getFloatingDisplay(): HTMLElement | null {
        return document.getElementById(constStrings.floatingDisplayID);
    }

    public static removeFloatingDisplay() {
        const oldDisplay = this.getFloatingDisplay();
        if (oldDisplay) oldDisplay.remove(); // delete the old display
    }
}

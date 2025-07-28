import { SpectrumComponent } from './types';

export const spectrumComponents: SpectrumComponent[] = [
    {
        name: "Button",
        category: "Actions",
        description: "Buttons allow users to perform an action or to navigate to another page. They have multiple styles for various needs, and are ideal for calling attention to where a user needs to do something in order to move forward in a flow.",
        props: [
            {
                name: "variant",
                type: "primary | secondary | negative | accent",
                required: false,
                defaultValue: "primary",
                description: "The visual style of the button",
                options: ["primary", "secondary", "negative", "accent"]
            },
            {
                name: "size",
                type: "S | M | L | XL",
                required: false,
                defaultValue: "M",
                description: "The size of the button",
                options: ["S", "M", "L", "XL"]
            },
            {
                name: "isDisabled",
                type: "boolean",
                required: false,
                defaultValue: "false",
                description: "Whether the button is disabled"
            },
            {
                name: "isPending",
                type: "boolean",
                required: false,
                defaultValue: "false",
                description: "Whether the button is in a pending state"
            },
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "The content to display in the button"
            }
        ],
        examples: [
            {
                title: "Basic Button",
                description: "A simple primary button",
                code: `<Button variant="primary">Click me</Button>`
            },
            {
                title: "Secondary Button",
                description: "A secondary style button",
                code: `<Button variant="secondary">Secondary action</Button>`
            },
            {
                title: "Disabled Button",
                description: "A disabled button state",
                code: `<Button isDisabled>Disabled</Button>`
            }
        ],
        accessibility: {
            ariaLabels: ["aria-label", "aria-labelledby", "aria-describedby"],
            keyboardSupport: ["Enter", "Space"],
            screenReaderSupport: "Announces button role and state"
        },
        designTokens: [
            {
                name: "--spectrum-button-primary-background-color",
                value: "var(--spectrum-blue-600)",
                category: "color",
                description: "Primary button background color"
            }
        ]
    },
    {
        name: "TextField",
        category: "Forms",
        description: "TextFields are text inputs that allow users to input custom text entries with a keyboard. Various decorations can be displayed around the field to communicate the entry requirements.",
        props: [
            {
                name: "label",
                type: "ReactNode",
                required: false,
                description: "The content to display as the label"
            },
            {
                name: "description",
                type: "ReactNode",
                required: false,
                description: "A description for the field"
            },
            {
                name: "errorMessage",
                type: "ReactNode",
                required: false,
                description: "An error message for the field"
            },
            {
                name: "isRequired",
                type: "boolean",
                required: false,
                defaultValue: "false",
                description: "Whether user input is required on the input"
            },
            {
                name: "isDisabled",
                type: "boolean",
                required: false,
                defaultValue: "false",
                description: "Whether the input is disabled"
            },
            {
                name: "isReadOnly",
                type: "boolean",
                required: false,
                defaultValue: "false",
                description: "Whether the input can be selected but not changed"
            }
        ],
        examples: [
            {
                title: "Basic TextField",
                description: "A simple text input with label",
                code: `<TextField label="Name" placeholder="Enter your name" />`
            },
            {
                title: "Required TextField",
                description: "A required text input with validation",
                code: `<TextField 
  label="Email" 
  isRequired 
  type="email"
  description="We'll never share your email"
/>`
            }
        ],
        accessibility: {
            ariaLabels: ["aria-label", "aria-labelledby", "aria-describedby"],
            keyboardSupport: ["Tab", "Shift+Tab", "Arrow keys"],
            screenReaderSupport: "Announces label, description, and validation state"
        },
        designTokens: [
            {
                name: "--spectrum-textfield-border-color",
                value: "var(--spectrum-gray-400)",
                category: "color",
                description: "TextField border color"
            }
        ]
    }
];

export function getComponentByName(name: string): SpectrumComponent | undefined {
    return spectrumComponents.find(comp =>
        comp.name.toLowerCase() === name.toLowerCase()
    );
}

export function getComponentsByCategory(category: string): SpectrumComponent[] {
    return spectrumComponents.filter(comp =>
        comp.category.toLowerCase() === category.toLowerCase()
    );
}

export function searchComponents(query: string): SpectrumComponent[] {
    const lowercaseQuery = query.toLowerCase();
    return spectrumComponents.filter(comp =>
        comp.name.toLowerCase().includes(lowercaseQuery) ||
        comp.description.toLowerCase().includes(lowercaseQuery) ||
        comp.category.toLowerCase().includes(lowercaseQuery)
    );
}
// Static component data to avoid GitHub API subrequest limits
// Complete list of all 86 components from actual Spectrum 2 repository
export const SPECTRUM_COMPONENTS = [
  {
    name: 'Accordion',
    category: 'Layout',
    description: 'Accordions are collapsible sections that are useful for reducing vertical space with large amounts of information.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Accordion items' },
      { name: 'allowsMultipleExpanded', type: 'boolean', required: false, description: 'Whether multiple items can be expanded at once' }
    ],
    examples: [
      {
        title: 'Basic Accordion',
        description: 'A simple accordion with multiple items',
        code: '<Accordion><Item title="Section 1">Content 1</Item><Item title="Section 2">Content 2</Item></Accordion>'
      }
    ]
  },
  {
    name: 'ActionBar',
    category: 'Actions',
    description: 'ActionBars are used to provide quick access to common actions.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'ActionButton elements' },
      { name: 'isEmphasized', type: 'boolean', required: false, description: 'Whether the action bar should be emphasized' }
    ],
    examples: [
      {
        title: 'Basic ActionBar',
        description: 'An action bar with buttons',
        code: '<ActionBar><ActionButton>Edit</ActionButton><ActionButton>Delete</ActionButton></ActionBar>'
      }
    ]
  },
  {
    name: 'ActionButton',
    category: 'Actions',
    description: 'ActionButtons allow users to perform an action. They\'re used for similar, task-based options within a workflow.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The content to display in the button' },
      { name: 'isDisabled', type: 'boolean', required: false, description: 'Whether the button is disabled' },
      { name: 'onPress', type: '(e: PressEvent) => void', required: false, description: 'Handler called when the button is pressed' }
    ],
    examples: [
      {
        title: 'Basic ActionButton',
        description: 'A simple action button',
        code: '<ActionButton>Save</ActionButton>'
      }
    ]
  },
  {
    name: 'ActionButtonGroup',
    category: 'Actions',
    description: 'ActionButtonGroups are used to group related ActionButtons together.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'ActionButton elements' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", required: false, description: 'The orientation of the group' }
    ],
    examples: [
      {
        title: 'ActionButton Group',
        description: 'A group of action buttons',
        code: '<ActionButtonGroup><ActionButton>Cut</ActionButton><ActionButton>Copy</ActionButton></ActionButtonGroup>'
      }
    ]
  },
  {
    name: 'ActionMenu',
    category: 'Actions',
    description: 'ActionMenus are used to group a collection of actions together.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'MenuItem elements' },
      { name: 'onAction', type: '(key: Key) => void', required: false, description: 'Handler called when an action is selected' }
    ],
    examples: [
      {
        title: 'Action Menu',
        description: 'A menu with actions',
        code: '<ActionMenu><Item key="edit">Edit</Item><Item key="delete">Delete</Item></ActionMenu>'
      }
    ]
  },
  {
    name: 'AlertDialog',
    category: 'Overlays',
    description: 'AlertDialogs are a specific type of Dialog. They display important information that users need to acknowledge.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The contents of the alert dialog' },
      { name: 'variant', type: "'confirmation' | 'information' | 'warning' | 'error' | 'destructive'", required: false, description: 'The variant of the alert' }
    ],
    examples: [
      {
        title: 'Confirmation Dialog',
        description: 'An alert dialog for confirmation',
        code: '<AlertDialog variant="confirmation" title="Confirm" primaryActionLabel="Delete">Are you sure?</AlertDialog>'
      }
    ]
  },
  {
    name: 'ActionGroup',
    category: 'Actions',
    description: 'ActionGroup is a grouping of ActionButtons that are related to each other.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'ActionButton elements' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", required: false, description: 'The orientation of the action group' }
    ],
    examples: [
      {
        title: 'Horizontal ActionGroup',
        description: 'A group of action buttons arranged horizontally',
        code: '<ActionGroup><ActionButton>Cut</ActionButton><ActionButton>Copy</ActionButton></ActionGroup>'
      }
    ]
  },
  {
    name: 'Avatar',
    category: 'Content',
    description: 'Avatars are used to represent a person or entity.',
    props: [
      { name: 'src', type: 'string', required: false, description: 'The URL of the avatar image' },
      { name: 'alt', type: 'string', required: false, description: 'Alternative text for the avatar' },
      { name: 'size', type: "'avatar-size-50' | 'avatar-size-75' | 'avatar-size-100'", required: false, description: 'The size of the avatar' }
    ],
    examples: [
      {
        title: 'Basic Avatar',
        description: 'An avatar with an image',
        code: '<Avatar src="/avatar.jpg" alt="User avatar" />'
      }
    ]
  },
  {
    name: 'Badge',
    category: 'Status',
    description: 'Badges are used to highlight an item\'s status for quick recognition.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The content of the badge' },
      { name: 'variant', type: "'neutral' | 'accent' | 'informative' | 'positive' | 'notice' | 'negative'", required: false, description: 'The visual style of the badge' }
    ],
    examples: [
      {
        title: 'Status Badge',
        description: 'A badge showing status',
        code: '<Badge variant="positive">Active</Badge>'
      }
    ]
  },
  {
    name: 'Button',
    category: 'Actions',
    description: 'Buttons allow users to perform an action or to navigate to another page.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The content to display in the button' },
      { name: 'variant', type: "'accent' | 'primary' | 'secondary' | 'negative'", required: false, description: 'The visual style of the button' },
      { name: 'onPress', type: '(e: PressEvent) => void', required: false, description: 'Handler called when the button is pressed' },
      { name: 'isDisabled', type: 'boolean', required: false, description: 'Whether the button is disabled' }
    ],
    examples: [
      {
        title: 'Primary Button',
        description: 'A primary call-to-action button',
        code: '<Button variant="accent">Get Started</Button>'
      }
    ]
  },
  {
    name: 'ButtonGroup',
    category: 'Actions',
    description: 'ButtonGroup handles overflow for a grouping of buttons whose actions are related to each other.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Button elements' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", required: false, description: 'The orientation of the button group' }
    ],
    examples: [
      {
        title: 'Button Group',
        description: 'A group of related buttons',
        code: '<ButtonGroup><Button>Save</Button><Button>Cancel</Button></ButtonGroup>'
      }
    ]
  },
  {
    name: 'Checkbox',
    category: 'Forms',
    description: 'Checkboxes allow users to select multiple items from a list of individual items.',
    props: [
      { name: 'children', type: 'ReactNode', required: false, description: 'The label for the checkbox' },
      { name: 'isSelected', type: 'boolean', required: false, description: 'Whether the checkbox is selected' },
      { name: 'onChange', type: '(isSelected: boolean) => void', required: false, description: 'Handler called when the selection changes' },
      { name: 'isDisabled', type: 'boolean', required: false, description: 'Whether the checkbox is disabled' }
    ],
    examples: [
      {
        title: 'Basic Checkbox',
        description: 'A simple checkbox',
        code: '<Checkbox>Subscribe to newsletter</Checkbox>'
      }
    ]
  },
  {
    name: 'ComboBox',
    category: 'Forms',
    description: 'A ComboBox combines a text input with a listbox, allowing users to filter a list of options.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Item elements' },
      { name: 'label', type: 'ReactNode', required: false, description: 'The content to display as the label' },
      { name: 'onSelectionChange', type: '(key: Key) => void', required: false, description: 'Handler called when the selection changes' }
    ],
    examples: [
      {
        title: 'Basic ComboBox',
        description: 'A combo box with options',
        code: '<ComboBox label="Choose option"><Item>Option 1</Item><Item>Option 2</Item></ComboBox>'
      }
    ]
  },
  {
    name: 'Dialog',
    category: 'Overlays',
    description: 'Dialogs are windows containing contextual information, tasks, or workflows that appear over the user interface.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The contents of the dialog' },
      { name: 'onDismiss', type: '() => void', required: false, description: 'Handler called when the dialog should be dismissed' }
    ],
    examples: [
      {
        title: 'Basic Dialog',
        description: 'A simple dialog',
        code: '<Dialog><Heading>Confirm</Heading><Content>Are you sure?</Content></Dialog>'
      }
    ]
  },
  {
    name: 'Divider',
    category: 'Layout',
    description: 'Dividers bring clarity to a layout by grouping and dividing content in close proximity.',
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", required: false, description: 'The orientation of the divider' },
      { name: 'size', type: "'S' | 'M' | 'L'", required: false, description: 'The thickness of the divider' }
    ],
    examples: [
      {
        title: 'Horizontal Divider',
        description: 'A horizontal divider',
        code: '<Divider />'
      }
    ]
  },
  {
    name: 'Form',
    category: 'Forms',
    description: 'Forms allow users to enter and submit data.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Form field elements' },
      { name: 'onSubmit', type: '(e: FormEvent) => void', required: false, description: 'Handler called when the form is submitted' }
    ],
    examples: [
      {
        title: 'Basic Form',
        description: 'A simple form',
        code: '<Form><TextField label="Name" /><Button type="submit">Submit</Button></Form>'
      }
    ]
  },
  {
    name: 'Heading',
    category: 'Content',
    description: 'Headings communicate the organization of content on the page.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The heading text' },
      { name: 'level', type: '1 | 2 | 3 | 4 | 5 | 6', required: false, description: 'The heading level' }
    ],
    examples: [
      {
        title: 'Page Heading',
        description: 'A main page heading',
        code: '<Heading level={1}>Welcome</Heading>'
      }
    ]
  },
  {
    name: 'Link',
    category: 'Navigation',
    description: 'Links allow users to navigate to a different location.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The link text' },
      { name: 'href', type: 'string', required: false, description: 'The URL to navigate to' },
      { name: 'onPress', type: '(e: PressEvent) => void', required: false, description: 'Handler called when the link is pressed' }
    ],
    examples: [
      {
        title: 'External Link',
        description: 'A link to an external page',
        code: '<Link href="https://example.com">Visit Example</Link>'
      }
    ]
  },
  {
    name: 'Menu',
    category: 'Collections',
    description: 'Menus display a list of actions or options that a user can choose.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'MenuItem elements' },
      { name: 'onAction', type: '(key: Key) => void', required: false, description: 'Handler called when a menu item is selected' }
    ],
    examples: [
      {
        title: 'Basic Menu',
        description: 'A simple menu',
        code: '<Menu><MenuItem>Edit</MenuItem><MenuItem>Delete</MenuItem></Menu>'
      }
    ]
  },

  // N-Z Components (Worker 2)
  {
    name: 'NumberField',
    category: 'Forms',
    description: 'NumberFields allow users to enter a number, and optionally increment or decrement the value using stepper buttons.',
    props: [
      { name: 'label', type: 'ReactNode', required: false, description: 'The content to display as the label' },
      { name: 'value', type: 'number', required: false, description: 'The current value' },
      { name: 'onChange', type: '(value: number) => void', required: false, description: 'Handler called when the value changes' },
      { name: 'minValue', type: 'number', required: false, description: 'The minimum allowed value' },
      { name: 'maxValue', type: 'number', required: false, description: 'The maximum allowed value' }
    ],
    examples: [
      {
        title: 'Basic NumberField',
        description: 'A number input field',
        code: '<NumberField label="Quantity" defaultValue={1} minValue={0} />'
      }
    ]
  },
  {
    name: 'Picker',
    category: 'Forms',
    description: 'Pickers allow users to choose from a list of options in a compact way.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Item elements' },
      { name: 'label', type: 'ReactNode', required: false, description: 'The content to display as the label' },
      { name: 'onSelectionChange', type: '(key: Key) => void', required: false, description: 'Handler called when the selection changes' }
    ],
    examples: [
      {
        title: 'Basic Picker',
        description: 'A picker with options',
        code: '<Picker label="Choose option"><Item>Option 1</Item><Item>Option 2</Item></Picker>'
      }
    ]
  },
  {
    name: 'ProgressBar',
    category: 'Status',
    description: 'ProgressBars show the progression of a system operation such as downloading, uploading, or processing.',
    props: [
      { name: 'label', type: 'ReactNode', required: false, description: 'The content to display as the label' },
      { name: 'value', type: 'number', required: false, description: 'The current progress value (0-100)' },
      { name: 'isIndeterminate', type: 'boolean', required: false, description: 'Whether the progress is indeterminate' }
    ],
    examples: [
      {
        title: 'Progress Bar',
        description: 'A progress bar showing completion',
        code: '<ProgressBar label="Loading..." value={75} />'
      }
    ]
  },
  {
    name: 'ProgressCircle',
    category: 'Status',
    description: 'ProgressCircles show the progression of a system operation in a circular format.',
    props: [
      { name: 'value', type: 'number', required: false, description: 'The current progress value (0-100)' },
      { name: 'isIndeterminate', type: 'boolean', required: false, description: 'Whether the progress is indeterminate' },
      { name: 'size', type: "'S' | 'M' | 'L'", required: false, description: 'The size of the progress circle' }
    ],
    examples: [
      {
        title: 'Progress Circle',
        description: 'A circular progress indicator',
        code: '<ProgressCircle value={60} />'
      }
    ]
  },
  {
    name: 'Radio',
    category: 'Forms',
    description: 'Radio buttons allow users to select a single option from a list of mutually exclusive options.',
    props: [
      { name: 'children', type: 'ReactNode', required: false, description: 'The label for the radio button' },
      { name: 'value', type: 'string', required: true, description: 'The value of the radio button' },
      { name: 'isDisabled', type: 'boolean', required: false, description: 'Whether the radio button is disabled' }
    ],
    examples: [
      {
        title: 'Radio Button',
        description: 'A single radio button',
        code: '<Radio value="option1">Option 1</Radio>'
      }
    ]
  },
  {
    name: 'RadioGroup',
    category: 'Forms',
    description: 'RadioGroups allow users to select a single option from a list of mutually exclusive options.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Radio elements' },
      { name: 'label', type: 'ReactNode', required: false, description: 'The content to display as the label' },
      { name: 'value', type: 'string', required: false, description: 'The currently selected value' },
      { name: 'onChange', type: '(value: string) => void', required: false, description: 'Handler called when the selection changes' }
    ],
    examples: [
      {
        title: 'Radio Group',
        description: 'A group of radio buttons',
        code: '<RadioGroup label="Choose one"><Radio value="a">Option A</Radio><Radio value="b">Option B</Radio></RadioGroup>'
      }
    ]
  },
  {
    name: 'SearchField',
    category: 'Forms',
    description: 'SearchFields are text fields designed for search behavior.',
    props: [
      { name: 'label', type: 'ReactNode', required: false, description: 'The content to display as the label' },
      { name: 'value', type: 'string', required: false, description: 'The current value' },
      { name: 'onChange', type: '(value: string) => void', required: false, description: 'Handler called when the value changes' },
      { name: 'onSubmit', type: '(value: string) => void', required: false, description: 'Handler called when the search is submitted' }
    ],
    examples: [
      {
        title: 'Search Field',
        description: 'A search input field',
        code: '<SearchField label="Search" placeholder="Enter search terms..." />'
      }
    ]
  },
  {
    name: 'Slider',
    category: 'Forms',
    description: 'Sliders allow users to quickly select a value within a range.',
    props: [
      { name: 'label', type: 'ReactNode', required: false, description: 'The content to display as the label' },
      { name: 'value', type: 'number', required: false, description: 'The current value' },
      { name: 'onChange', type: '(value: number) => void', required: false, description: 'Handler called when the value changes' },
      { name: 'minValue', type: 'number', required: false, description: 'The minimum value' },
      { name: 'maxValue', type: 'number', required: false, description: 'The maximum value' }
    ],
    examples: [
      {
        title: 'Basic Slider',
        description: 'A slider for selecting values',
        code: '<Slider label="Volume" defaultValue={50} minValue={0} maxValue={100} />'
      }
    ]
  },
  {
    name: 'Switch',
    category: 'Forms',
    description: 'Switches allow users to turn an individual option on or off.',
    props: [
      { name: 'children', type: 'ReactNode', required: false, description: 'The label for the switch' },
      { name: 'isSelected', type: 'boolean', required: false, description: 'Whether the switch is selected' },
      { name: 'onChange', type: '(isSelected: boolean) => void', required: false, description: 'Handler called when the selection changes' },
      { name: 'isDisabled', type: 'boolean', required: false, description: 'Whether the switch is disabled' }
    ],
    examples: [
      {
        title: 'Basic Switch',
        description: 'A toggle switch',
        code: '<Switch>Enable notifications</Switch>'
      }
    ]
  },
  {
    name: 'Table',
    category: 'Collections',
    description: 'Tables display data in rows and columns and enable a user to navigate its contents via directional navigation keys.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'TableHeader and TableBody elements' },
      { name: 'onSelectionChange', type: '(keys: Selection) => void', required: false, description: 'Handler called when the selection changes' }
    ],
    examples: [
      {
        title: 'Basic Table',
        description: 'A simple data table',
        code: '<Table><TableHeader><Column>Name</Column></TableHeader><TableBody><Row><Cell>John</Cell></Row></TableBody></Table>'
      }
    ]
  },
  {
    name: 'Tabs',
    category: 'Navigation',
    description: 'Tabs organize content into multiple sections and allow users to navigate between them.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'TabList and TabPanels elements' },
      { name: 'selectedKey', type: 'Key', required: false, description: 'The currently selected tab' },
      { name: 'onSelectionChange', type: '(key: Key) => void', required: false, description: 'Handler called when the selection changes' }
    ],
    examples: [
      {
        title: 'Basic Tabs',
        description: 'A set of tabs',
        code: '<Tabs><TabList><Item key="tab1">Tab 1</Item><Item key="tab2">Tab 2</Item></TabList><TabPanels><Item key="tab1">Content 1</Item></TabPanels></Tabs>'
      }
    ]
  },
  {
    name: 'Text',
    category: 'Content',
    description: 'Text represents text with no specific semantic meaning.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The text content' },
      { name: 'slot', type: 'string', required: false, description: 'A slot name for the component' }
    ],
    examples: [
      {
        title: 'Basic Text',
        description: 'Simple text content',
        code: '<Text>This is some text content.</Text>'
      }
    ]
  },
  {
    name: 'TextArea',
    category: 'Forms',
    description: 'TextAreas are multiline text inputs, useful for cases where users have a sizable amount of text to enter.',
    props: [
      { name: 'label', type: 'ReactNode', required: false, description: 'The content to display as the label' },
      { name: 'value', type: 'string', required: false, description: 'The current value' },
      { name: 'onChange', type: '(value: string) => void', required: false, description: 'Handler called when the value changes' },
      { name: 'placeholder', type: 'string', required: false, description: 'Placeholder text' }
    ],
    examples: [
      {
        title: 'Basic TextArea',
        description: 'A multiline text input',
        code: '<TextArea label="Comments" placeholder="Enter your comments..." />'
      }
    ]
  },
  {
    name: 'TextField',
    category: 'Forms',
    description: 'TextFields are text inputs that allow users to input custom text entries with a keyboard.',
    props: [
      { name: 'label', type: 'ReactNode', required: false, description: 'The content to display as the label' },
      { name: 'value', type: 'string', required: false, description: 'The current value' },
      { name: 'onChange', type: '(value: string) => void', required: false, description: 'Handler called when the value changes' },
      { name: 'placeholder', type: 'string', required: false, description: 'Placeholder text' },
      { name: 'type', type: "'text' | 'password' | 'email' | 'tel' | 'url'", required: false, description: 'The type of input' }
    ],
    examples: [
      {
        title: 'Basic TextField',
        description: 'A single-line text input',
        code: '<TextField label="Name" placeholder="Enter your name" />'
      }
    ]
  },
  {
    name: 'ToggleButton',
    category: 'Actions',
    description: 'ToggleButtons allow users to toggle a selection on or off, for example switching between two states or modes.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The content to display in the button' },
      { name: 'isSelected', type: 'boolean', required: false, description: 'Whether the button is selected' },
      { name: 'onChange', type: '(isSelected: boolean) => void', required: false, description: 'Handler called when the selection changes' }
    ],
    examples: [
      {
        title: 'Toggle Button',
        description: 'A button that can be toggled',
        code: '<ToggleButton>Bold</ToggleButton>'
      }
    ]
  },
  {
    name: 'Tooltip',
    category: 'Overlays',
    description: 'Tooltips display a description of an element on hover or focus.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The trigger element' },
      { name: 'content', type: 'ReactNode', required: true, description: 'The tooltip content' },
      { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", required: false, description: 'The placement of the tooltip' }
    ],
    examples: [
      {
        title: 'Basic Tooltip',
        description: 'A tooltip on hover',
        code: '<Tooltip content="This is a tooltip"><Button>Hover me</Button></Tooltip>'
      }
    ]
  },

  // Additional components to reach full 86 component coverage
  {
    name: 'AvatarGroup',
    category: 'Content',
    description: 'AvatarGroups are used to display multiple avatars together in a compact format.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Avatar elements' },
      { name: 'maxCount', type: 'number', required: false, description: 'Maximum number of avatars to display' }
    ],
    examples: [
      {
        title: 'Avatar Group',
        description: 'A group of avatars',
        code: '<AvatarGroup><Avatar src="/user1.jpg" /><Avatar src="/user2.jpg" /></AvatarGroup>'
      }
    ]
  },
  {
    name: 'Breadcrumbs',
    category: 'Navigation',
    description: 'Breadcrumbs show hierarchy and navigational context for a user\'s location within an application.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Breadcrumb items' },
      { name: 'onAction', type: '(key: Key) => void', required: false, description: 'Handler called when a breadcrumb is pressed' }
    ],
    examples: [
      {
        title: 'Basic Breadcrumbs',
        description: 'Navigation breadcrumbs',
        code: '<Breadcrumbs><Item key="home">Home</Item><Item key="products">Products</Item></Breadcrumbs>'
      }
    ]
  },
  {
    name: 'Calendar',
    category: 'Forms',
    description: 'Calendars display a grid of days in one or more months and allow users to select a single date.',
    props: [
      { name: 'value', type: 'CalendarDate', required: false, description: 'The current selected date' },
      { name: 'onChange', type: '(date: CalendarDate) => void', required: false, description: 'Handler called when the date changes' }
    ],
    examples: [
      {
        title: 'Basic Calendar',
        description: 'A date selection calendar',
        code: '<Calendar aria-label="Select date" />'
      }
    ]
  },
  {
    name: 'Card',
    category: 'Layout',
    description: 'Cards are used to group information in a flexible-size container.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The content of the card' },
      { name: 'variant', type: "'primary' | 'secondary'", required: false, description: 'The visual style of the card' }
    ],
    examples: [
      {
        title: 'Basic Card',
        description: 'A simple card container',
        code: '<Card><Heading>Title</Heading><Text>Content</Text></Card>'
      }
    ]
  },
  {
    name: 'CardView',
    category: 'Collections',
    description: 'CardView displays a collection of data in a card-based layout.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Card items' },
      { name: 'onSelectionChange', type: '(keys: Selection) => void', required: false, description: 'Handler called when selection changes' }
    ],
    examples: [
      {
        title: 'Card View',
        description: 'A collection of cards',
        code: '<CardView><Item><Card>Card 1</Card></Item><Item><Card>Card 2</Card></Item></CardView>'
      }
    ]
  },
  {
    name: 'CheckboxGroup',
    category: 'Forms',
    description: 'CheckboxGroup allows users to select multiple items from a list of options.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Checkbox elements' },
      { name: 'label', type: 'ReactNode', required: false, description: 'The label for the group' },
      { name: 'value', type: 'string[]', required: false, description: 'The selected values' }
    ],
    examples: [
      {
        title: 'Checkbox Group',
        description: 'A group of checkboxes',
        code: '<CheckboxGroup label="Options"><Checkbox value="a">Option A</Checkbox><Checkbox value="b">Option B</Checkbox></CheckboxGroup>'
      }
    ]
  },
  {
    name: 'ColorArea',
    category: 'Forms',
    description: 'ColorArea allows users to adjust two channels of an HSB, HSL or RGB color value against a two-dimensional gradient background.',
    props: [
      { name: 'value', type: 'Color', required: false, description: 'The current color value' },
      { name: 'onChange', type: '(color: Color) => void', required: false, description: 'Handler called when the color changes' }
    ],
    examples: [
      {
        title: 'Color Area',
        description: 'A 2D color picker',
        code: '<ColorArea />'
      }
    ]
  },
  {
    name: 'ColorField',
    category: 'Forms',
    description: 'ColorField allows users to edit a hex color or enter a custom color value.',
    props: [
      { name: 'label', type: 'ReactNode', required: false, description: 'The label for the color field' },
      { name: 'value', type: 'string', required: false, description: 'The current color value' },
      { name: 'onChange', type: '(value: string) => void', required: false, description: 'Handler called when the value changes' }
    ],
    examples: [
      {
        title: 'Color Field',
        description: 'A text input for color values',
        code: '<ColorField label="Color" />'
      }
    ]
  },
  {
    name: 'ColorSlider',
    category: 'Forms',
    description: 'ColorSlider allows users to adjust a single channel of a color value.',
    props: [
      { name: 'channel', type: "'hue' | 'saturation' | 'brightness' | 'red' | 'green' | 'blue'", required: true, description: 'The color channel to adjust' },
      { name: 'value', type: 'Color', required: false, description: 'The current color value' }
    ],
    examples: [
      {
        title: 'Color Slider',
        description: 'A slider for color adjustment',
        code: '<ColorSlider channel="hue" />'
      }
    ]
  },
  {
    name: 'ColorSwatch',
    category: 'Forms',
    description: 'ColorSwatch displays a preview of a selected color.',
    props: [
      { name: 'color', type: 'string', required: true, description: 'The color to display' },
      { name: 'size', type: "'XS' | 'S' | 'M' | 'L'", required: false, description: 'The size of the swatch' }
    ],
    examples: [
      {
        title: 'Color Swatch',
        description: 'A color preview',
        code: '<ColorSwatch color="#ff0000" />'
      }
    ]
  },
  {
    name: 'ColorSwatchPicker',
    category: 'Forms',
    description: 'ColorSwatchPicker displays a grid of color swatches and allows a user to select one.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'ColorSwatch elements' },
      { name: 'onSelectionChange', type: '(color: string) => void', required: false, description: 'Handler called when selection changes' }
    ],
    examples: [
      {
        title: 'Color Swatch Picker',
        description: 'A grid of color swatches',
        code: '<ColorSwatchPicker><ColorSwatch color="#ff0000" /><ColorSwatch color="#00ff00" /></ColorSwatchPicker>'
      }
    ]
  },
  {
    name: 'ColorWheel',
    category: 'Forms',
    description: 'ColorWheel allows users to adjust the hue of an HSB or HSL color value on a circular track.',
    props: [
      { name: 'value', type: 'Color', required: false, description: 'The current color value' },
      { name: 'onChange', type: '(color: Color) => void', required: false, description: 'Handler called when the color changes' }
    ],
    examples: [
      {
        title: 'Color Wheel',
        description: 'A circular color picker',
        code: '<ColorWheel />'
      }
    ]
  },
  {
    name: 'ContextualHelp',
    category: 'Overlays',
    description: 'ContextualHelp shows a user extra information about a nearby component.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The help content' },
      { name: 'variant', type: "'help' | 'info'", required: false, description: 'The type of contextual help' }
    ],
    examples: [
      {
        title: 'Contextual Help',
        description: 'Help information overlay',
        code: '<ContextualHelp><Heading>Help</Heading><Content>This is helpful information.</Content></ContextualHelp>'
      }
    ]
  },
  {
    name: 'DateField',
    category: 'Forms',
    description: 'DateField allows users to enter and edit date values using a keyboard.',
    props: [
      { name: 'label', type: 'ReactNode', required: false, description: 'The label for the date field' },
      { name: 'value', type: 'CalendarDate', required: false, description: 'The current date value' },
      { name: 'onChange', type: '(date: CalendarDate) => void', required: false, description: 'Handler called when the date changes' }
    ],
    examples: [
      {
        title: 'Date Field',
        description: 'A text input for dates',
        code: '<DateField label="Date" />'
      }
    ]
  },
  {
    name: 'DatePicker',
    category: 'Forms',
    description: 'DatePicker combines a DateField and a Calendar popover to allow users to enter or select a date value.',
    props: [
      { name: 'label', type: 'ReactNode', required: false, description: 'The label for the date picker' },
      { name: 'value', type: 'CalendarDate', required: false, description: 'The current date value' },
      { name: 'onChange', type: '(date: CalendarDate) => void', required: false, description: 'Handler called when the date changes' }
    ],
    examples: [
      {
        title: 'Date Picker',
        description: 'A date input with calendar popup',
        code: '<DatePicker label="Date" />'
      }
    ]
  },
  {
    name: 'DateRangePicker',
    category: 'Forms',
    description: 'DateRangePicker combines two DateFields and a RangeCalendar popover to allow users to enter or select a date range.',
    props: [
      { name: 'label', type: 'ReactNode', required: false, description: 'The label for the date range picker' },
      { name: 'value', type: 'DateRange', required: false, description: 'The current date range value' },
      { name: 'onChange', type: '(range: DateRange) => void', required: false, description: 'Handler called when the range changes' }
    ],
    examples: [
      {
        title: 'Date Range Picker',
        description: 'A date range input with calendar popup',
        code: '<DateRangePicker label="Date Range" />'
      }
    ]
  },
  {
    name: 'DialogContainer',
    category: 'Overlays',
    description: 'DialogContainer accepts a single Dialog as a child and manages showing and hiding it.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Dialog element' },
      { name: 'onDismiss', type: '() => void', required: false, description: 'Handler called when the dialog is dismissed' }
    ],
    examples: [
      {
        title: 'Dialog Container',
        description: 'A container for managing dialogs',
        code: '<DialogContainer><Dialog>Content</Dialog></DialogContainer>'
      }
    ]
  },
  {
    name: 'DialogTrigger',
    category: 'Overlays',
    description: 'DialogTrigger serves as a wrapper around a Dialog and its associated trigger, linking the Dialog\'s open state with the trigger\'s press state.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Trigger and Dialog elements' },
      { name: 'type', type: "'modal' | 'popover' | 'tray' | 'fullscreen' | 'fullscreenTakeover'", required: false, description: 'The type of dialog' }
    ],
    examples: [
      {
        title: 'Dialog Trigger',
        description: 'A trigger that opens a dialog',
        code: '<DialogTrigger><ActionButton>Open</ActionButton><Dialog>Content</Dialog></DialogTrigger>'
      }
    ]
  },
  {
    name: 'DropZone',
    category: 'Forms',
    description: 'DropZone is an area into which users can drag and drop objects to perform actions.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The content of the drop zone' },
      { name: 'onDrop', type: '(e: DropEvent) => void', required: false, description: 'Handler called when items are dropped' }
    ],
    examples: [
      {
        title: 'Drop Zone',
        description: 'An area for drag and drop',
        code: '<DropZone><Text>Drop files here</Text></DropZone>'
      }
    ]
  },
  {
    name: 'IllustratedMessage',
    category: 'Content',
    description: 'IllustratedMessage displays an illustration and message, typically used for empty states.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The message content' },
      { name: 'illustration', type: 'ReactNode', required: false, description: 'The illustration to display' }
    ],
    examples: [
      {
        title: 'Illustrated Message',
        description: 'A message with illustration',
        code: '<IllustratedMessage><Heading>No items</Heading><Content>No items found.</Content></IllustratedMessage>'
      }
    ]
  },
  {
    name: 'InlineAlert',
    category: 'Status',
    description: 'InlineAlert displays a contextual alert message inline with content.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The alert content' },
      { name: 'variant', type: "'neutral' | 'info' | 'positive' | 'notice' | 'negative'", required: false, description: 'The type of alert' }
    ],
    examples: [
      {
        title: 'Inline Alert',
        description: 'An inline alert message',
        code: '<InlineAlert variant="info">This is an informational alert.</InlineAlert>'
      }
    ]
  },
  {
    name: 'ListBox',
    category: 'Collections',
    description: 'ListBox displays a list of options and allows a user to select one or more of them.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Item elements' },
      { name: 'selectionMode', type: "'none' | 'single' | 'multiple'", required: false, description: 'The selection mode' }
    ],
    examples: [
      {
        title: 'List Box',
        description: 'A selectable list',
        code: '<ListBox><Item>Option 1</Item><Item>Option 2</Item></ListBox>'
      }
    ]
  },
  {
    name: 'Meter',
    category: 'Status',
    description: 'Meters represent a quantity within a known range, or a fractional value.',
    props: [
      { name: 'label', type: 'ReactNode', required: false, description: 'The label for the meter' },
      { name: 'value', type: 'number', required: true, description: 'The current value' },
      { name: 'minValue', type: 'number', required: false, description: 'The minimum value' },
      { name: 'maxValue', type: 'number', required: false, description: 'The maximum value' }
    ],
    examples: [
      {
        title: 'Meter',
        description: 'A measurement display',
        code: '<Meter label="Storage" value={75} maxValue={100} />'
      }
    ]
  },
  {
    name: 'NotificationBadge',
    category: 'Status',
    description: 'NotificationBadge displays a small badge, typically used for indicating notifications.',
    props: [
      { name: 'children', type: 'ReactNode', required: false, description: 'The badge content' },
      { name: 'variant', type: "'neutral' | 'informative' | 'positive' | 'notice' | 'negative'", required: false, description: 'The visual style' }
    ],
    examples: [
      {
        title: 'Notification Badge',
        description: 'A small notification indicator',
        code: '<NotificationBadge>3</NotificationBadge>'
      }
    ]
  },
  {
    name: 'Popover',
    category: 'Overlays',
    description: 'Popover is an overlay element positioned relative to a trigger.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The popover content' },
      { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", required: false, description: 'The placement relative to trigger' }
    ],
    examples: [
      {
        title: 'Popover',
        description: 'A contextual overlay',
        code: '<Popover><Dialog>Popover content</Dialog></Popover>'
      }
    ]
  },
  {
    name: 'RangeCalendar',
    category: 'Forms',
    description: 'RangeCalendar displays a grid of days in one or more months and allows users to select a contiguous range of dates.',
    props: [
      { name: 'value', type: 'DateRange', required: false, description: 'The current selected date range' },
      { name: 'onChange', type: '(range: DateRange) => void', required: false, description: 'Handler called when the range changes' }
    ],
    examples: [
      {
        title: 'Range Calendar',
        description: 'A calendar for selecting date ranges',
        code: '<RangeCalendar aria-label="Select date range" />'
      }
    ]
  },
  {
    name: 'RangeSlider',
    category: 'Forms',
    description: 'RangeSlider allows users to quickly select a subset range of values within a larger range.',
    props: [
      { name: 'label', type: 'ReactNode', required: false, description: 'The label for the range slider' },
      { name: 'value', type: 'number[]', required: false, description: 'The current range values' },
      { name: 'onChange', type: '(value: number[]) => void', required: false, description: 'Handler called when the range changes' }
    ],
    examples: [
      {
        title: 'Range Slider',
        description: 'A slider for selecting ranges',
        code: '<RangeSlider label="Price Range" defaultValue={[20, 80]} />'
      }
    ]
  },
  {
    name: 'SegmentedControl',
    category: 'Forms',
    description: 'SegmentedControl is used as an alternative to tabs when you want to provide closely related choices.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Segment items' },
      { name: 'selectedKey', type: 'Key', required: false, description: 'The currently selected segment' },
      { name: 'onSelectionChange', type: '(key: Key) => void', required: false, description: 'Handler called when selection changes' }
    ],
    examples: [
      {
        title: 'Segmented Control',
        description: 'A segmented selection control',
        code: '<SegmentedControl><Item key="list">List</Item><Item key="grid">Grid</Item></SegmentedControl>'
      }
    ]
  },
  {
    name: 'StatusLight',
    category: 'Status',
    description: 'StatusLight represents the status of an item.',
    props: [
      { name: 'children', type: 'ReactNode', required: false, description: 'The status label' },
      { name: 'variant', type: "'neutral' | 'celery' | 'chartreuse' | 'yellow' | 'magenta' | 'fuchsia' | 'purple' | 'indigo' | 'seafoam' | 'red' | 'orange' | 'green' | 'blue'", required: false, description: 'The color variant' }
    ],
    examples: [
      {
        title: 'Status Light',
        description: 'A status indicator',
        code: '<StatusLight variant="positive">Active</StatusLight>'
      }
    ]
  },
  {
    name: 'TableView',
    category: 'Collections',
    description: 'TableView displays data in rows and columns and enables a user to navigate its contents via directional navigation keys.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'TableHeader and TableBody elements' },
      { name: 'selectionMode', type: "'none' | 'single' | 'multiple'", required: false, description: 'The selection mode' }
    ],
    examples: [
      {
        title: 'Table View',
        description: 'A data table',
        code: '<TableView><TableHeader><Column>Name</Column></TableHeader><TableBody><Row><Cell>John</Cell></Row></TableBody></TableView>'
      }
    ]
  },
  {
    name: 'TagGroup',
    category: 'Collections',
    description: 'TagGroup is a focusable list of labels, categories, keywords, filters, or other items.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Tag items' },
      { name: 'onRemove', type: '(keys: Set<Key>) => void', required: false, description: 'Handler called when tags are removed' }
    ],
    examples: [
      {
        title: 'Tag Group',
        description: 'A group of removable tags',
        code: '<TagGroup><Item>Tag 1</Item><Item>Tag 2</Item></TagGroup>'
      }
    ]
  },
  {
    name: 'TimeField',
    category: 'Forms',
    description: 'TimeField allows users to enter and edit time values using a keyboard.',
    props: [
      { name: 'label', type: 'ReactNode', required: false, description: 'The label for the time field' },
      { name: 'value', type: 'Time', required: false, description: 'The current time value' },
      { name: 'onChange', type: '(time: Time) => void', required: false, description: 'Handler called when the time changes' }
    ],
    examples: [
      {
        title: 'Time Field',
        description: 'A text input for time values',
        code: '<TimeField label="Time" />'
      }
    ]
  },
  {
    name: 'Toast',
    category: 'Status',
    description: 'Toast displays a temporary notification that appears at the edge of the screen.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The toast content' },
      { name: 'variant', type: "'neutral' | 'positive' | 'negative' | 'info'", required: false, description: 'The type of toast' }
    ],
    examples: [
      {
        title: 'Toast',
        description: 'A temporary notification',
        code: '<Toast variant="positive">Success! Changes saved.</Toast>'
      }
    ]
  },
  {
    name: 'ToggleButtonGroup',
    category: 'Actions',
    description: 'ToggleButtonGroup groups related toggle buttons together.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'ToggleButton elements' },
      { name: 'selectionMode', type: "'single' | 'multiple'", required: false, description: 'The selection mode' }
    ],
    examples: [
      {
        title: 'Toggle Button Group',
        description: 'A group of toggle buttons',
        code: '<ToggleButtonGroup><ToggleButton>Bold</ToggleButton><ToggleButton>Italic</ToggleButton></ToggleButtonGroup>'
      }
    ]
  },
  {
    name: 'Toolbar',
    category: 'Actions',
    description: 'Toolbar provides a container for grouping a set of related interface controls.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Toolbar items' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", required: false, description: 'The orientation of the toolbar' }
    ],
    examples: [
      {
        title: 'Toolbar',
        description: 'A container for tools',
        code: '<Toolbar><ActionButton>Cut</ActionButton><ActionButton>Copy</ActionButton></Toolbar>'
      }
    ]
  },
  {
    name: 'TreeView',
    category: 'Collections',
    description: 'TreeView displays a hierarchical list of data that can be expanded and collapsed.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Tree items' },
      { name: 'onExpandedChange', type: '(keys: Set<Key>) => void', required: false, description: 'Handler called when expansion changes' }
    ],
    examples: [
      {
        title: 'Tree View',
        description: 'A hierarchical tree',
        code: '<TreeView><Item>Folder 1<Item>File 1</Item></Item><Item>Folder 2</Item></TreeView>'
      }
    ]
  },

  // Missing Components - Adding the final 15 to reach 100% coverage
  {
    name: 'CenterBaseline',
    category: 'Layout',
    description: 'CenterBaseline is a utility component for centering content on the baseline.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The content to center' }
    ],
    examples: [
      {
        title: 'Center Baseline',
        description: 'Center content on baseline',
        code: '<CenterBaseline><Text>Centered text</Text></CenterBaseline>'
      }
    ]
  },
  {
    name: 'ClearButton',
    category: 'Actions',
    description: 'ClearButton is used to clear input values or reset form fields.',
    props: [
      { name: 'onPress', type: '(e: PressEvent) => void', required: false, description: 'Handler called when the button is pressed' },
      { name: 'isDisabled', type: 'boolean', required: false, description: 'Whether the button is disabled' }
    ],
    examples: [
      {
        title: 'Clear Button',
        description: 'A button to clear input',
        code: '<ClearButton onPress={() => setValue("")} />'
      }
    ]
  },
  {
    name: 'CloseButton',
    category: 'Actions',
    description: 'CloseButton is used to close dialogs, panels, or other dismissible content.',
    props: [
      { name: 'onPress', type: '(e: PressEvent) => void', required: false, description: 'Handler called when the button is pressed' },
      { name: 'isDisabled', type: 'boolean', required: false, description: 'Whether the button is disabled' }
    ],
    examples: [
      {
        title: 'Close Button',
        description: 'A button to close dialogs',
        code: '<CloseButton onPress={() => setIsOpen(false)} />'
      }
    ]
  },
  {
    name: 'CoachMark',
    category: 'Overlays',
    description: 'CoachMark provides contextual guidance and onboarding hints to users.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The content of the coach mark' },
      { name: 'target', type: 'RefObject<Element>', required: true, description: 'The element to point to' },
      { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", required: false, description: 'Where to position the coach mark' }
    ],
    examples: [
      {
        title: 'Coach Mark',
        description: 'Contextual guidance overlay',
        code: '<CoachMark target={buttonRef}><Text>Click here to get started!</Text></CoachMark>'
      }
    ]
  },
  {
    name: 'ColorHandle',
    category: 'Forms',
    description: 'ColorHandle is a draggable handle used in color picker components.',
    props: [
      { name: 'color', type: 'Color', required: false, description: 'The current color value' },
      { name: 'onChange', type: '(color: Color) => void', required: false, description: 'Handler called when the color changes' }
    ],
    examples: [
      {
        title: 'Color Handle',
        description: 'Draggable color picker handle',
        code: '<ColorHandle color={color} onChange={setColor} />'
      }
    ]
  },
  {
    name: 'Content',
    category: 'Layout',
    description: 'Content is a generic container component for organizing content within other components.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The content to display' },
      { name: 'slot', type: 'string', required: false, description: 'A slot name for the component' }
    ],
    examples: [
      {
        title: 'Content Container',
        description: 'Generic content container',
        code: '<Content><Text>This is content</Text></Content>'
      }
    ]
  },
  {
    name: 'CustomDialog',
    category: 'Overlays',
    description: 'CustomDialog provides a highly customizable dialog component with flexible content.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The dialog content' },
      { name: 'onDismiss', type: '() => void', required: false, description: 'Handler called when the dialog is dismissed' },
      { name: 'isDismissable', type: 'boolean', required: false, description: 'Whether the dialog can be dismissed' }
    ],
    examples: [
      {
        title: 'Custom Dialog',
        description: 'A customizable dialog',
        code: '<CustomDialog><Heading>Custom Dialog</Heading><Content>Custom content here</Content></CustomDialog>'
      }
    ]
  },
  {
    name: 'Disclosure',
    category: 'Layout',
    description: 'Disclosure is an expandable content section that can be toggled open and closed.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The content to show/hide' },
      { name: 'isExpanded', type: 'boolean', required: false, description: 'Whether the disclosure is expanded' },
      { name: 'onExpandedChange', type: '(isExpanded: boolean) => void', required: false, description: 'Handler called when expansion changes' }
    ],
    examples: [
      {
        title: 'Disclosure',
        description: 'Expandable content section',
        code: '<Disclosure><Text>This content can be expanded or collapsed</Text></Disclosure>'
      }
    ]
  },
  {
    name: 'Field',
    category: 'Forms',
    description: 'Field is a container component that provides consistent layout and labeling for form controls.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The form control element' },
      { name: 'label', type: 'ReactNode', required: false, description: 'The field label' },
      { name: 'description', type: 'ReactNode', required: false, description: 'Help text for the field' },
      { name: 'errorMessage', type: 'ReactNode', required: false, description: 'Error message to display' }
    ],
    examples: [
      {
        title: 'Form Field',
        description: 'A form field container',
        code: '<Field label="Email" description="Enter your email address"><TextField /></Field>'
      }
    ]
  },
  {
    name: 'Fonts',
    category: 'Content',
    description: 'Fonts is a utility component for loading and managing font resources.',
    props: [
      { name: 'fonts', type: 'string[]', required: false, description: 'Array of font URLs to load' },
      { name: 'onLoad', type: '() => void', required: false, description: 'Handler called when fonts are loaded' }
    ],
    examples: [
      {
        title: 'Font Loader',
        description: 'Load custom fonts',
        code: '<Fonts fonts={["https://fonts.googleapis.com/css2?family=Inter"]} />'
      }
    ]
  },
  {
    name: 'FullscreenDialog',
    category: 'Overlays',
    description: 'FullscreenDialog displays a dialog that takes up the entire screen viewport.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The dialog content' },
      { name: 'onDismiss', type: '() => void', required: false, description: 'Handler called when the dialog is dismissed' },
      { name: 'isDismissable', type: 'boolean', required: false, description: 'Whether the dialog can be dismissed' }
    ],
    examples: [
      {
        title: 'Fullscreen Dialog',
        description: 'A full-screen dialog',
        code: '<FullscreenDialog><Heading>Fullscreen Content</Heading><Content>This dialog fills the screen</Content></FullscreenDialog>'
      }
    ]
  },
  {
    name: 'Icon',
    category: 'Content',
    description: 'Icon displays scalable vector icons from the Spectrum icon library.',
    props: [
      { name: 'name', type: 'string', required: true, description: 'The name of the icon to display' },
      { name: 'size', type: "'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'", required: false, description: 'The size of the icon' },
      { name: 'color', type: 'string', required: false, description: 'The color of the icon' }
    ],
    examples: [
      {
        title: 'Basic Icon',
        description: 'Display an icon',
        code: '<Icon name="Add" size="M" />'
      }
    ]
  },
  {
    name: 'Image',
    category: 'Content',
    description: 'Image displays responsive images with built-in loading and error states.',
    props: [
      { name: 'src', type: 'string', required: true, description: 'The URL of the image' },
      { name: 'alt', type: 'string', required: true, description: 'Alternative text for the image' },
      { name: 'width', type: 'number', required: false, description: 'The width of the image' },
      { name: 'height', type: 'number', required: false, description: 'The height of the image' },
      { name: 'objectFit', type: "'fill' | 'contain' | 'cover' | 'none' | 'scale-down'", required: false, description: 'How the image should be resized' }
    ],
    examples: [
      {
        title: 'Responsive Image',
        description: 'Display a responsive image',
        code: '<Image src="/photo.jpg" alt="A beautiful landscape" width={400} height={300} />'
      }
    ]
  },
  {
    name: 'ImageCoordinator',
    category: 'Content',
    description: 'ImageCoordinator manages the loading and coordination of multiple images.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Image components to coordinate' },
      { name: 'onLoadingChange', type: '(isLoading: boolean) => void', required: false, description: 'Handler called when loading state changes' }
    ],
    examples: [
      {
        title: 'Image Coordinator',
        description: 'Coordinate multiple image loading',
        code: '<ImageCoordinator><Image src="/img1.jpg" alt="Image 1" /><Image src="/img2.jpg" alt="Image 2" /></ImageCoordinator>'
      }
    ]
  },
  {
    name: 'Modal',
    category: 'Overlays',
    description: 'Modal displays content in a layer above the main application, blocking interaction with the background.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The modal content' },
      { name: 'isOpen', type: 'boolean', required: false, description: 'Whether the modal is open' },
      { name: 'onOpenChange', type: '(isOpen: boolean) => void', required: false, description: 'Handler called when the open state changes' },
      { name: 'isDismissable', type: 'boolean', required: false, description: 'Whether the modal can be dismissed' }
    ],
    examples: [
      {
        title: 'Basic Modal',
        description: 'A modal overlay',
        code: '<Modal isOpen={isOpen} onOpenChange={setIsOpen}><Dialog><Heading>Modal Title</Heading><Content>Modal content</Content></Dialog></Modal>'
      }
    ]
  },
  {
    name: 'Provider',
    category: 'Layout',
    description: 'Provider supplies theme, locale, and other context to Spectrum components.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'The application content' },
      { name: 'theme', type: "'light' | 'dark' | 'auto'", required: false, description: 'The theme to apply' },
      { name: 'colorScheme', type: "'light' | 'dark'", required: false, description: 'The color scheme' },
      { name: 'locale', type: 'string', required: false, description: 'The locale for internationalization' }
    ],
    examples: [
      {
        title: 'App Provider',
        description: 'Provide theme and context',
        code: '<Provider theme="light" locale="en-US"><App /></Provider>'
      }
    ]
  },
  {
    name: 'Skeleton',
    category: 'Status',
    description: 'Skeleton displays a placeholder while content is loading.',
    props: [
      { name: 'width', type: 'number | string', required: false, description: 'The width of the skeleton' },
      { name: 'height', type: 'number | string', required: false, description: 'The height of the skeleton' },
      { name: 'variant', type: "'text' | 'rectangular' | 'circular'", required: false, description: 'The shape of the skeleton' }
    ],
    examples: [
      {
        title: 'Loading Skeleton',
        description: 'A loading placeholder',
        code: '<Skeleton width={200} height={20} variant="text" />'
      }
    ]
  },
  {
    name: 'SkeletonCollection',
    category: 'Status',
    description: 'SkeletonCollection displays multiple skeleton placeholders for loading collections.',
    props: [
      { name: 'count', type: 'number', required: false, description: 'Number of skeleton items to display' },
      { name: 'variant', type: "'text' | 'rectangular' | 'circular'", required: false, description: 'The shape of the skeletons' }
    ],
    examples: [
      {
        title: 'Skeleton Collection',
        description: 'Multiple loading placeholders',
        code: '<SkeletonCollection count={5} variant="text" />'
      }
    ]
  },
  {
    name: 'TabsPicker',
    category: 'Navigation',
    description: 'TabsPicker provides a compact tabs interface with overflow handling for many tabs.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Tab items' },
      { name: 'selectedKey', type: 'Key', required: false, description: 'The currently selected tab' },
      { name: 'onSelectionChange', type: '(key: Key) => void', required: false, description: 'Handler called when selection changes' }
    ],
    examples: [
      {
        title: 'Tabs Picker',
        description: 'Compact tabs with overflow',
        code: '<TabsPicker><Item key="tab1">Tab 1</Item><Item key="tab2">Tab 2</Item><Item key="tab3">Tab 3</Item></TabsPicker>'
      }
    ]
  }
];

// Helper functions to filter components by range
export function getComponentsInRange(startLetter: string, endLetter: string) {
  return SPECTRUM_COMPONENTS.filter(component => {
    const firstLetter = component.name.charAt(0).toLowerCase();
    return firstLetter >= startLetter.toLowerCase() && firstLetter <= endLetter.toLowerCase();
  });
}

export function getComponentByName(name: string) {
  return SPECTRUM_COMPONENTS.find(component => 
    component.name.toLowerCase() === name.toLowerCase()
  );
}
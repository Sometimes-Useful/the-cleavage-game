const supportedWidths = ['w-fit', 'w-full', ''] as const

export type width = typeof supportedWidths[number]

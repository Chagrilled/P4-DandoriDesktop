import { vi } from 'vitest';

// Mock fs
vi.mock('fs', () => {
    return {
        writeFile: vi.fn(),
        readFile: vi.fn(),
        accessSync: vi.fn()
    };
});

// Mock electron
vi.mock('electron', () => {
    return {
        app: {
            getPath: vi.fn(() => 'mocked/path'),
            on: vi.fn(),
            whenReady: vi.fn().mockResolvedValue(),
        },
        BrowserWindow: vi.fn(),
        ipcMain: {
            on: vi.fn(),
        },
    };
});

// Mock createMenu
vi.mock('../src/utils/createMenu', () => {
    return {
        createMenu: vi.fn(),
    };
});

vi.mock('../src/utils/logger', () => {
    return {
        default: { info: vi.fn() }
    };
});

// Mock main module
vi.mock('../src/main', () => {
    return {
        saveMaps: vi.fn(),
        readMapData: vi.fn()
    };
});

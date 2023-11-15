'use client';
import * as React from 'react';

export const ColorModeContext = React.createContext({toggleColorMode: () => {}});

export const ChangeThemeContext = React.createContext(() => {});
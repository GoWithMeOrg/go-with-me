'use client';

import { createContext, useContext } from 'react';
import { LikeState } from './types';

const LikesContext = createContext<LikeState | null>(null);

export const useLikesContext = () => useContext(LikesContext);
export const LikesProvider = LikesContext.Provider;

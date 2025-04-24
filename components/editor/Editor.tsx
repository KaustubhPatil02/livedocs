'use client';

import React, { useCallback } from 'react';
import DOMPurify from 'dompurify';
import { $getRoot, $getSelection } from 'lexical';

import {
  HeadingNode,
} from '@lexical/rich-text';
import {
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import {
  RichTextPlugin,
} from '@lexical/react/LexicalRichTextPlugin';
import {
  ContentEditable,
} from '@lexical/react/LexicalContentEditable';
import {
  HistoryPlugin,
} from '@lexical/react/LexicalHistoryPlugin';
import {
  AutoFocusPlugin,
} from '@lexical/react/LexicalAutoFocusPlugin';
import {
  LexicalErrorBoundary,
} from '@lexical/react/LexicalErrorBoundary';

import {
  FloatingComposer,
  FloatingThreads,
  liveblocksConfig,
  LiveblocksPlugin,
  useEditorStatus,
} from '@liveblocks/react-lexical';
import { useThreads } from '@liveblocks/react/suspense';

import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import FloatingToolbarPlugin from './plugins/FloatingToolbarPlugin';

import Loader from '../Loader';
import Comments from '../Comments';
import { DeleteModal } from '../modals/DeleteModal';

type UserType = 'viewer' | 'editor';

function Placeholder() {
  return (
    <div className="editor-placeholder">
      Well what are you waiting for? Start Typing!..
    </div>
  );
}

const sanitizePastedContent = (event: ClipboardEvent) => {
  event.preventDefault();

  const clipboardData = event.clipboardData;
  if (!clipboardData) return;

  const text = clipboardData.getData('text/plain') || '';
  const html = clipboardData.getData('text/html') || '';
  const sanitized = html ? DOMPurify.sanitize(html) : text;

  const selection = $getSelection();
  $getRoot().select();
  selection?.insertText(sanitized);
};

export function Editor({
  roomId,
  currentUserId,
  creatorId,
  currentUserType,
}: {
  roomId: string;
  currentUserId: string;
  creatorId: string;
  currentUserType: UserType;
}) {
  const status = useEditorStatus();
  const { threads } = useThreads();

  const initialConfig = liveblocksConfig({
    namespace: 'Editor',
    theme: Theme,
    nodes: [HeadingNode],
    editable: currentUserType === 'editor',
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
  });

  const handlePaste = useCallback(sanitizePastedContent, []);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container size-full">
        {/* Toolbar Section */}
        <div className="toolbar-wrapper flex max-w-full justify-between">
          <ToolbarPlugin />
          {currentUserId === creatorId && (
            <DeleteModal
              roomId={roomId}
              creatorId={creatorId}
              currentUserId={currentUserId}
            />
          )}
        </div>

        {/* Editor + Comments Section */}
        <div className="editor-wrapper flex flex-col items-center justify-start">
          {status === 'not-loaded' || status === 'loading' ? (
            <Loader />
          ) : (
            <div
              className="editor-inner min-h-[1100px] relative mb-5 h-fit w-full max-w-[800px] shadow-md lg:mb-10"
              onPaste={handlePaste}
            >
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="editor-input h-full" />
                }
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              {currentUserType === 'editor' && <FloatingToolbarPlugin />}
              <HistoryPlugin />
              <AutoFocusPlugin />
            </div>
          )}

          {/* Liveblocks Section */}
          <LiveblocksPlugin>
            {/* Desktop-only live features container */}
            <div className="hidden lg:flex flex-col gap-4 fixed right-5 top-[140px] w-[350px] z-20">
              <FloatingComposer />
              <FloatingThreads threads={threads} />
              <Comments />
            </div>
          </LiveblocksPlugin>

        </div>
      </div>
    </LexicalComposer>
  );
}

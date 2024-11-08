'use client'

import * as React from 'react'

import IconWrapper from '@/_components/ui/icon-wrapper'
import { Trash, FilePen, Scissors, Files } from 'lucide-react'

export default function ContextMenu({ onCopy, onMove, onRename, onDelete }) {
  function copyHandler() {
    onCopy()
  }

  function moveHandler() {
    onMove()
  }

  function renameHandler() {
    onRename()
  }

  function deleteHandler() {
    onDelete()
  }

  return (
    <div className="flex justify-center gap-2">
      <IconWrapper onClick={copyHandler}>
        <Files size={16} />
      </IconWrapper>
      <IconWrapper onClick={moveHandler}>
        <Scissors size={16} />
      </IconWrapper>
      <IconWrapper onClick={renameHandler}>
        <FilePen size={16} />
      </IconWrapper>
      <IconWrapper onClick={deleteHandler}>
        <Trash size={16} />
      </IconWrapper>
    </div>
  )
}

import React from 'react'
import { Spinner } from '@heroui/spinner'

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <Spinner color="primary" className="scale-150" />
      <div className="text-primary/70 animate-pulse font-medium">
        Carregando dados...
      </div>
    </div>
  )
}

export default Loading

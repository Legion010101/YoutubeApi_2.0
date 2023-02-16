import React from 'react'

export function withSuspense(Component: React.ComponentType) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component />
    </React.Suspense>
  )
}

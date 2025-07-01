'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { CopilotKit } from '@copilotkit/react-core'
import { CopilotSidebar } from '@copilotkit/react-ui'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
      },
    },
  }))

  const [supabaseClient] = useState(() => createClientComponentClient())

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <QueryClientProvider client={queryClient}>
        <CopilotKit 
          runtimeUrl="/api/copilotkit"
          showDevConsole={process.env.NODE_ENV === 'development'}
        >
          <CopilotSidebar>
            {children}
          </CopilotSidebar>
        </CopilotKit>
      </QueryClientProvider>
    </SessionContextProvider>
  )
}

import { ReactNode, useEffect, useMemo, useState } from 'react'

import { OngoingQueriesPanel } from 'components/interfaces/SQLEditor/OngoingQueriesPanel'
import { withAuth } from 'hooks/misc/withAuth'
import ProjectLayout from '../ProjectLayout/ProjectLayout'
import { SQLEditorMenu } from './SQLEditorMenu'
import { useParams } from 'common'

export interface SQLEditorLayoutProps {
  // title: string
  children: ReactNode
}

const SQLEditorLayout = ({ children }: SQLEditorLayoutProps) => {
  const { viewOngoingQueries } = useParams()
  const [showOngoingQueries, setShowOngoingQueries] = useState(false)

  const productMenu = useMemo(
    () => (
      <SQLEditorMenu
        key="sql-editor-menu"
        onViewOngoingQueries={() => setShowOngoingQueries(true)}
      />
    ),
    []
  )

  useEffect(() => {
    if (viewOngoingQueries === 'true') setShowOngoingQueries(true)
  }, [viewOngoingQueries])

  return (
    // <EditorBaseLayout
    //   title={title || 'SQL'}
    //   product="SQL Editor"
    //   productMenu={
    //     <SQLEditorMenu
    //       key="sql-editor-menu"
    //       onViewOngoingQueries={() => setShowOngoingQueries(true)}
    //     />
    //   }
    //   isBlocking={false}
    //   resizableSidebar
    // >
    <>
      {children}
      <OngoingQueriesPanel
        visible={showOngoingQueries}
        onClose={() => setShowOngoingQueries(false)}
      />
    </>
    // </EditorBaseLayout>
  )
}

export default withAuth(SQLEditorLayout)

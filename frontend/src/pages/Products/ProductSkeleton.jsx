import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CardSkeleton = () => {
  return (
    <div className="skeleton">
      <SkeletonTheme color="white" highlightColor="lightgray">
        <Skeleton className="skeleton" height="300px" width="204px" />
        <div
          style={{
            display: 'block',
            marginTop: '10px',
            gap: '5px',
          }}
        >
          <Skeleton className="skeleton-inner" height="20px" width="200px" />
          <Skeleton className="skeleton-inner" height="20px" width="160px" />
          <Skeleton className="skeleton-inner" height="20px" width="60px" />
        </div>
      </SkeletonTheme>
    </div>
  )
}

export default CardSkeleton

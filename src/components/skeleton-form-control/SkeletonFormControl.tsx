import React from "react"
import Skeleton from "react-loading-skeleton"

interface ISkeletonFormControl {
  loading: boolean
  height?: number
  children: React.ReactNode
}

const SkeletonFormControl: React.FC<ISkeletonFormControl> = ({
  children,
  height,
  loading,
}: ISkeletonFormControl) => {
  if (loading) {
    return <Skeleton height={height} className="form-control" />
  }

  return <>{children}</>
}

export default SkeletonFormControl

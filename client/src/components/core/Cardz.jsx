export const Cardz = ({ className = "", children }) => {
  return (
    <div className={`p-4 shadow-custom rounded-md ${className}`}>{children}</div>
  )
}

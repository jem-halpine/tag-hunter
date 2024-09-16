interface Props {
  title: string
}

export function Title({ title }: Props) {
  return (
    <div>
      <h1 className="mb-4 mt-6 font-title text-6xl font-bold text-thBlack">
        {title}
      </h1>
    </div>
  )
}

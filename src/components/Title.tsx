interface Props {
  title: string
}

export function Title({ title }: Props) {
  return (
    <div>
      <h1 className="font-title text-6xl font-bold">{title}</h1>
    </div>
  )
}

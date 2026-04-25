interface Props {
  src: string
}

export function HtmlPage({ src }: Props) {
  return (
    <iframe
      src={src}
      style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
      title={src}
    />
  )
}

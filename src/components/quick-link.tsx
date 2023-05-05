interface QuickLinkProps {
  link: string;
  image: string;
  overline: string;
  text: string;
}

export default function QuickLink({ link, image, overline, text }: QuickLinkProps) {
  return (
    <div className="cell large-4 medium-4">
      <a href={link}>
        <div className="card card-minimal-style py-8 px-6">
          <img style={{ maxWidth: '42px' }} src={image} alt={overline} />
          <p className="text-overline mt-4">{overline}</p>
          <p className="font-bold mt-2">{text}</p>
        </div>
      </a>
    </div>

  )
}

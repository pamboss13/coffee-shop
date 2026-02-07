interface CartButtonProps {
  available: boolean;
  link: string;
}

export default function AddToCartButton({ link, available }: CartButtonProps) {
  return (
    <a href={available ? link : undefined} className={!available ? 'pointer-events-none' : ''}>
      {available ? 'Add to Cart' : 'Sold Out'}
    </a>
  )
}

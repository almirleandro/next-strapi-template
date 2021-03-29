import Link from 'next/link'

export default function Header() {
  return (
    <header className='Header'>
      <Link href='/'>
        <h1>Next.js + Strapi Project</h1>
      </Link>
    </header>
  )
}
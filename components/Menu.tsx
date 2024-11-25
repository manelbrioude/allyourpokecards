import Link from "next/link";

export default function Menu() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link href="/" className="hover:underline">
            All Cards
          </Link>
        </li>
        <li>
          <Link href="/collection" className="hover:underline">
            My Collection
          </Link>
        </li>
      </ul>
    </nav>
  );
}

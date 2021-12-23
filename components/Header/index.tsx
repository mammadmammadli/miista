import { Container } from "../Container";
import Image from "next/image";
import Link from "next/link";
import { navigations } from "./const";
import { Zoom } from "../Icons/Zoom";
import { Heart } from "../Icons/Heart";
import { Bag } from "../Icons/Bag";

export const Header = () => {
  return (
    <div className="absolute w-full">
      <Container>
        <div className="flex justify-between py-14">
          <Image src="/images/logo.svg" height="19" width="143" />

          <div>
            <ul className="list-none flex">
              {navigations.map(({ href, id, title }) => (
                <li key={id} className="mx-8">
                  <Link href={href}>
                    <span className="text-sm text-white uppercase">
                      {title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ul className="list-none flex items-center">
              <li className="mr-8">
                <span className="text-sm text-white uppercase">EN$</span>
              </li>
              <li className="mr-8">
                <span className="text-sm text-white uppercase">
                  Account Assistance
                </span>
              </li>
              <li>
                <ul className="list-none flex">
                  <li className="mr-2">
                    <Zoom />
                  </li>
                  <li className="mr-2">
                    <Heart />
                  </li>
                  <li>
                    <Bag />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

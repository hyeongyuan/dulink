import { DevicePhoneMobileIcon, LinkIcon } from "@heroicons/react/24/solid";

export function SideMenu() {
  return (
    <div className="border-r border-base-300 hidden sm:block">
      <ul className="menu rounded-box gap-2">
        <li>
          <a className="menu-active p-2" href="/">
            <LinkIcon className="size-4" />
          </a>
        </li>
        <li>
          <a className="p-2" href="/">
            <DevicePhoneMobileIcon className="size-4" />
          </a>
        </li>
      </ul>
    </div>
  );
}

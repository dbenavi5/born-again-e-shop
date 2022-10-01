import Link from 'next/link';
import React from 'react';

export default function DropdownLink(props, ref) {
  let { href, children, ...rest } = props;
  return (
    <Link href={href} ref={ref }>
      <a {...rest}>{children}</a>
    </Link>
  );
}
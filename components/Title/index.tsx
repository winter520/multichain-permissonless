import {
  CSS,
  Text,
  Row
} from "@nextui-org/react";

export default function Title ({
  title,
  size = '$2xl',
  css = {}
}: {
  title: string
  size?: string | undefined
  css?: CSS
}) {
  return <>
    <Row>
      <Text
        size={size}
        b
        css={{
          marginBottom: '20px',
          ...css
        }}
      >
        {title}
      </Text>
    </Row>
  </>
}
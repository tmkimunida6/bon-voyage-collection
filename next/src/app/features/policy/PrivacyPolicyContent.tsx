import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  OrderedList,
  ListItem,
} from '@chakra-ui/react'

export default function PrivacyPolicyContent() {
  return (
    <Box
      p={8}
      maxW="660px"
      mx="auto"
      bg="white"
      px={{ base: 6, md: 10 }}
      py={{ base: 10, md: 16 }}
      fontSize="sm"
    >
      <Heading as="h1" mb={8} textAlign="center">
        プライバシーポリシー
      </Heading>
      <VStack align="start" spacing={6}>
        <Text fontSize="sm">
          Bon Voyage
          Collection（以下、「当社」といいます。）は、本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
        </Text>

        <Divider />

        <Box>
          <Heading as="h2" size="md" mb={4} lineHeight="1.5">
            第1条（個人情報）
          </Heading>
          <Text>
            「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
          </Text>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="md" mb={4} lineHeight="1.3">
            第2条（個人情報の収集方法）
          </Heading>
          <Text>
            当社は、ユーザーが利用登録をする際に以下の個人情報を取得します。
          </Text>
          <OrderedList display="flex" flexDirection="column" gap={2} mt={4}>
            <ListItem>ユーザー名（ニックネーム）</ListItem>
            <ListItem>メールアドレス</ListItem>
            <ListItem>写真</ListItem>
            <ListItem>
              外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
            </ListItem>
            <ListItem>Cookie（クッキー）を用いて生成された識別情報</ListItem>
            <ListItem>
              当社ウェブサイトの滞在時間、入力履歴等の当社ウェブサイトにおけるお客様の行動履歴
            </ListItem>
          </OrderedList>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="md" mb={4} lineHeight="1.3">
            第3条（個人情報を収集・利用する目的）
          </Heading>
          <Text>当社が個人情報を収集・利用する目的は、以下のとおりです。</Text>
          <OrderedList p={4} display="flex" flexDirection="column" gap={2}>
            <ListItem>
              当社サービスに関する登録の受付、お客様の本人確認、認証のため
            </ListItem>
            <ListItem>お客様の当社サービスの利用履歴を管理するため</ListItem>
            <ListItem>
              当社サービスにおけるお客様の行動履歴を分析し、当社サービスの維持改善に役立てるため
            </ListItem>
            <ListItem>お客様からのお問い合わせに対応するため</ListItem>
            <ListItem>当社の規約や法令に違反する行為に対応するため</ListItem>
            <ListItem>
              当社サービスの変更、提供中止、終了、契約解除をご連絡するため
            </ListItem>
            <ListItem>当社規約の変更等を通知するため</ListItem>
            <ListItem>
              以上の他、当社サービスの提供、維持、保護及び改善のため
            </ListItem>
          </OrderedList>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="md" mb={4} lineHeight="1.3">
            第4条（利用目的の変更）
          </Heading>
          <OrderedList display="flex" flexDirection="column" gap={2}>
            <ListItem>
              当社は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。
            </ListItem>
            <ListItem>
              利用目的の変更を行った場合には、変更後の目的について、当社所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。
            </ListItem>
          </OrderedList>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="md" mb={4} lineHeight="1.3">
            第5条（個人情報の第三者提供）
          </Heading>
          <Text>
            当社は、お客様から取得する情報のうち、個人データ（個人情報保護法第１６条第３項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
            但し、次の場合は除きます。
          </Text>
          <OrderedList display="flex" flexDirection="column" gap={2}>
            <ListItem>個人データの取扱いを外部に委託する場合</ListItem>
            <ListItem>当社や当社サービスが買収された場合</ListItem>
            <ListItem>
              事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
            </ListItem>
            <ListItem>
              その他、法律によって合法的に第三者提供が許されている場合
            </ListItem>
          </OrderedList>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="md" mb={4} lineHeight="1.3">
            第6条（個人情報の開示）
          </Heading>
          <OrderedList display="flex" flexDirection="column" gap={2}>
            <ListItem>
              当社は、本人から個人情報の開示を求められたときは、本人に対し、遅滞なくこれを開示します。ただし、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあり、開示しない決定をした場合には、その旨を遅滞なく通知します。なお、個人情報の開示に際しては、1件あたり1,000円の手数料を申し受けます。
              <OrderedList p={4} display="flex" flexDirection="column" gap={2}>
                <ListItem>
                  本人または第三者の生命、身体、財産その他の権利利益を害するおそれがある場合
                </ListItem>
                <ListItem>
                  当社の業務の適正な実施に著しい支障を及ぼすおそれがある場合
                </ListItem>
                <ListItem>その他法令に違反することとなる場合</ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              前項の定めにかかわらず、履歴情報および特性情報などの個人情報以外の情報については、原則として開示いたしません。
            </ListItem>
          </OrderedList>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="md" mb={4} lineHeight="1.3">
            第7条（個人情報の訂正および削除）
          </Heading>
          <OrderedList display="flex" flexDirection="column" gap={2}>
            <ListItem>
              ユーザーは、当社の保有する自己の個人情報が誤った情報である場合には、当社が定める手続きにより、当社に対して個人情報の訂正、追加または削除（以下、「訂正等」といいます。）を請求することができます。
            </ListItem>
            <ListItem>
              当社は、ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の訂正等を行うものとします。
            </ListItem>
            <ListItem>
              当社は、前項の規定に基づき訂正等を行った場合、または訂正等を行わない旨の決定をしたときは遅滞なく、これをユーザーに通知します。
            </ListItem>
          </OrderedList>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="md" mb={4} lineHeight="1.3">
            第8条（個人情報の利用停止等）
          </Heading>
          <OrderedList display="flex" flexDirection="column" gap={2}>
            <ListItem>
              当社は、本人から、個人情報が、利用目的の範囲を超えて取り扱われているという理由、または不正の手段により取得されたものであるという理由により、その利用の停止または消去（以下、「利用停止等」といいます。）を求められた場合には、遅滞なく必要な調査を行います。
            </ListItem>
            <ListItem>
              前項の調査結果に基づき、その請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の利用停止等を行います。
            </ListItem>
            <ListItem>
              当社は、前項の規定に基づき利用停止等を行った場合、または利用停止等を行わない旨の決定をしたときは、遅滞なく、これをユーザーに通知します。
            </ListItem>
            <ListItem>
              前2項にかかわらず、利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって、ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は、この代替策を講じるものとします。
            </ListItem>
          </OrderedList>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="md" mb={4} lineHeight="1.3">
            第9条（プライバシーポリシーの変更）
          </Heading>
          <OrderedList display="flex" flexDirection="column" gap={2}>
            <ListItem>
              本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
            </ListItem>
            <ListItem>
              当社が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
            </ListItem>
          </OrderedList>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="md" mb={4} lineHeight="1.3">
            第10条（お問い合わせ窓口）
          </Heading>
          <Text>
            本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
          </Text>
          <Text mt={4}>Eメールアドレス：bon.boyage.collection@gmail.com</Text>
        </Box>

        <Text width="100%" textAlign="right" mt={4}>
          2025年1月25日制定
        </Text>
      </VStack>
    </Box>
  )
}

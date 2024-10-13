'use client'

import {
  Button,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  Text,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import CustomAccordionItem from '../components/molecules/CustomAccordionItem'
import TextIconLink from '../components/molecules/TextIconLink'
import TriggerWithModal from '../components/organisms/modal/TriggerWithModal'
import SouvenirCard from '../components/organisms/souvenir/SouvenirCard'
import SouvenirCardList from '../components/organisms/souvenir/SouvenirCardList'

const Top: NextPage = () => {
  return (
    <>
      <h1>Top</h1>
      <Button variant="primary">おすすめのお土産をみる</Button>
      <TextIconLink iconName="FaPenSquare" iconPosition="left" href="#">
        編集する
      </TextIconLink>
      <SouvenirCardList
        size="lg"
        renderItem={(size) => (
          <>
            <SouvenirCard size={size} isFavoritable={true} />
            <SouvenirCard size={size} isFavoritable={true} />
            <SouvenirCard size={size} isFavoritable={true} />
          </>
        )}
      />
      <TriggerWithModal
        renderTrigger={({ onClick }) => (
          <Input placeholder="Click to open modal" onClick={onClick} />
        )}
        modalTitle="詳細条件"
        buttonText="確定"
      >
        <Tabs>
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </TriggerWithModal>
      <Accordion allowToggle>
        <CustomAccordionItem
          title="アコーディオンを開く"
          triggerBgColor="brand.gray"
          hasBorder={true}
        >
          <Text>あああああああああああ</Text>
        </CustomAccordionItem>
      </Accordion>
    </>
  )
}

export default Top

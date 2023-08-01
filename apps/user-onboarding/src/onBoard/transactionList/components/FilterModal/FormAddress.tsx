import { GetDistrictList } from '@screens/addSupplementaryInfo/redux/actions/DistrictList';
import { GetCommuneList } from '@screens/addSupplementaryInfo/redux/actions/GetCommuneList';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { ListItem } from 'src/typings/global';
import TextInputDropdown from '../InputComponents/TextInputDropdown';
import Section from './Section';

type Props = {
  provinces: ListItem[];
  districts: ListItem[];
  communes: ListItem[];
  onSelectedProvinces: (items: ListItem[]) => void;
  onSelectedDistricts: (items: ListItem[]) => void;
  onSelectedCommunes: (items: ListItem[]) => void;
};

const FormAddress = ({
  onSelectedProvinces,
  onSelectedDistricts,
  onSelectedCommunes,
  provinces,
  districts,
  communes,
}: Props) => {
  const provinceList = useAppSelector((state: RootState) => state.getProvinceList);
  const districtList = useAppSelector((state: RootState) => state.getDistrictList);
  const communeList = useAppSelector((state: RootState) => state.getCommunelist);

  const dispatch = useAppDispatch();

  const [selectedProvinces, setSelectedProvinces] = React.useState<ListItem[]>(provinces);
  const [selectedDistricts, setSelectedDistricts] = React.useState<ListItem[]>(districts);
  const [selectedCommunes, setSelectedCommunes] = React.useState<ListItem[]>(communes);

  useEffect(() => {
    if (selectedProvinces.length === 1) {
      dispatch(
        GetDistrictList({
          provinceCode: selectedProvinces[0].code ?? '',
        })
      );
    }
  }, [selectedProvinces, dispatch]);

  useEffect(() => {
    if (selectedDistricts.length === 1) {
      dispatch(
        GetCommuneList({
          districtCode: selectedDistricts[0].code ?? '',
        })
      );
    }
  }, [selectedDistricts, dispatch]);

  useEffect(() => {
    onSelectedProvinces(selectedProvinces);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvinces]);

  useEffect(() => {
    onSelectedDistricts(selectedDistricts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistricts]);

  useEffect(() => {
    onSelectedCommunes(selectedCommunes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCommunes]);

  return (
    <Section title="Địa chỉ khách hàng">
      <View
        style={{
          flex: 1,
          marginTop: 16,
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TextInputDropdown
          type="multiSelect"
          title={'Tỉnh/Thành phố'}
          placeholder="Tỉnh thành"
          selectedItems={selectedProvinces}
          viewStyle={{ flex: 0.48 }}
          data={provinceList.response?.provinces ?? []}
          onSelected={(items) => {
            setSelectedProvinces(items);
          }}
        />
        <TextInputDropdown
          type="multiSelect"
          title={'Quận/Huyện'}
          placeholder="Quận huyện"
          data={districtList?.response?.districts ?? []}
          viewStyle={{ flex: 0.48 }}
          selectedItems={selectedDistricts}
          onSelected={(items) => {
            setSelectedDistricts(items);
          }}
          disabled={selectedProvinces.length !== 1}
        />
      </View>
      <TextInputDropdown
        type="multiSelect"
        title={'Phường/Xã'}
        placeholder="Phường xã"
        data={communeList?.response?.communces ?? []}
        viewStyle={{ flex: 0.48 }}
        selectedItems={selectedCommunes}
        onSelected={(items) => {
          setSelectedCommunes(items);
        }}
        disabled={selectedDistricts.length !== 1}
      />
    </Section>
  );
};

export default FormAddress;

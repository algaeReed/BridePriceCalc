import React, { useState } from 'react';
import { Layout, Input, Button, Select, Slider, Row, Col, Typography, Card } from 'antd';
import './App.css';

const { Option } = Select;
const { Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  // 男方和女方的状态
  const [maleEducation, setMaleEducation] = useState<string>('本科');
  const [femaleEducation, setFemaleEducation] = useState<string>('本科');
  const [maleCity, setMaleCity] = useState<string>('北京');
  const [femaleCity, setFemaleCity] = useState<string>('上海');
  const [maleIncome, setMaleIncome] = useState<number>(10000);
  const [femaleIncome, setFemaleIncome] = useState<number>(10000);
  const [maleProperty, setMaleProperty] = useState<boolean>(false);
  const [femaleProperty, setFemaleProperty] = useState<boolean>(false);
  const [maleFamilyBurden, setMaleFamilyBurden] = useState<boolean>(false);
  const [femaleFamilyBurden, setFemaleFamilyBurden] = useState<boolean>(false);
  const [giftWish, setGiftWish] = useState<number>(50);
  const [calculatedGift, setCalculatedGift] = useState<number | null>(null);
  const [baseAmount, setBaseAmount] = useState<number>(50000);  // 新增基础金额状态

  // 系数数据
  const educationCoefficients: { [key: string]: number } = {
    高中: 0.8,
    中专: 0.9,
    大专: 1.0,
    本科: 1.1,
    硕士: 1.2,
    博士: 1.3,
    博士后: 1.5,
  };

  const cityCoefficients: { [key: string]: number } = {
    北京: 1.2,
    上海: 1.2,
    广州: 1.1,
    其他: 1.0,
  };

  const handleCalculate = () => {
    const maleEducationCoef = educationCoefficients[maleEducation];
    const femaleEducationCoef = educationCoefficients[femaleEducation];
    const maleCityCoef = cityCoefficients[maleCity];
    const femaleCityCoef = cityCoefficients[femaleCity];
    const malePropertyCoef = maleProperty ? 0.9 : 1.0;
    const femalePropertyCoef = femaleProperty ? 0.9 : 1.0;
    const maleFamilyBurdenCoef = maleFamilyBurden ? 1.1 : 1.0;
    const femaleFamilyBurdenCoef = femaleFamilyBurden ? 1.1 : 1.0;
    const giftWishCoef = 1 + giftWish / 100;

    const finalGift = baseAmount *
      maleCityCoef *
      femaleCityCoef *
      maleEducationCoef *
      femaleEducationCoef *
      malePropertyCoef *
      femalePropertyCoef *
      maleFamilyBurdenCoef *
      femaleFamilyBurdenCoef *
      giftWishCoef;

    setCalculatedGift(finalGift);
  };

  return (
    <Layout>
      <Content style={{ padding: '50px 20px', backgroundColor: '#f5f5f5' }}>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={14}>
            <Card bordered={false} style={{ padding: '20px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
              <Title level={2} style={{ textAlign: 'center' }}>彩礼计算器</Title>

              <Row gutter={16} style={{ marginBottom: '20px' }}>
                {/* 男方部分 */}
                <Col xs={24} sm={12}>
                  {/* 男方学历 */}
                  <div style={{ marginBottom: '20px' }}>
                    <label>男方学历:</label>
                    <Select value={maleEducation} onChange={setMaleEducation} style={{ width: '100%' }}>
                      <Option value="高中">高中</Option>
                      <Option value="中专">中专</Option>
                      <Option value="大专">大专</Option>
                      <Option value="本科">本科</Option>
                      <Option value="硕士">硕士</Option>
                      <Option value="博士">博士</Option>
                      <Option value="博士后">博士后</Option>
                    </Select>
                  </div>

                  {/* 男方城市 */}
                  <div style={{ marginBottom: '20px' }}>
                    <label>男方城市:</label>
                    <Select value={maleCity} onChange={setMaleCity} style={{ width: '100%' }}>
                      <Option value="北京">北京</Option>
                      <Option value="上海">上海</Option>
                      <Option value="广州">广州</Option>
                      <Option value="其他">其他</Option>
                    </Select>
                  </div>

                  {/* 男方月收入 */}
                  <div style={{ marginBottom: '20px' }}>
                    <label>男方月收入 (元):</label>
                    <Input
                      type="number"
                      value={maleIncome}
                      onChange={(e) => setMaleIncome(parseInt(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>

                  {/* 男方是否有房产 */}
                  <div style={{ marginBottom: '20px' }}>
                    <label>男方是否有房产:</label>
                    <Select value={maleProperty ? '有房产' : '无房产'} onChange={(value) => setMaleProperty(value === '有房产')} style={{ width: '100%' }}>
                      <Option value="无房产">无房产</Option>
                      <Option value="有房产">有房产</Option>
                    </Select>
                  </div>

                  {/* 男方家庭负担 */}
                  <div style={{ marginBottom: '20px' }}>
                    <label>男方家庭负担:</label>
                    <Select value={maleFamilyBurden ? '有负担' : '无负担'} onChange={(value) => setMaleFamilyBurden(value === '有负担')} style={{ width: '100%' }}>
                      <Option value="无负担">无负担</Option>
                      <Option value="有负担">有负担</Option>
                    </Select>
                  </div>
                </Col>

                {/* 女方部分 */}
                <Col xs={24} sm={12}>
                  {/* 女方学历 */}
                  <div style={{ marginBottom: '20px' }}>
                    <label>女方学历:</label>
                    <Select value={femaleEducation} onChange={setFemaleEducation} style={{ width: '100%' }}>
                      <Option value="高中">高中</Option>
                      <Option value="中专">中专</Option>
                      <Option value="大专">大专</Option>
                      <Option value="本科">本科</Option>
                      <Option value="硕士">硕士</Option>
                      <Option value="博士">博士</Option>
                      <Option value="博士后">博士后</Option>
                    </Select>
                  </div>

                  {/* 女方城市 */}
                  <div style={{ marginBottom: '20px' }}>
                    <label>女方城市:</label>
                    <Select value={femaleCity} onChange={setFemaleCity} style={{ width: '100%' }}>
                      <Option value="北京">北京</Option>
                      <Option value="上海">上海</Option>
                      <Option value="广州">广州</Option>
                      <Option value="其他">其他</Option>
                    </Select>
                  </div>

                  {/* 女方月收入 */}
                  <div style={{ marginBottom: '20px' }}>
                    <label>女方月收入 (元):</label>
                    <Input
                      type="number"
                      value={femaleIncome}
                      onChange={(e) => setFemaleIncome(parseInt(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>

                  {/* 女方是否有房产 */}
                  <div style={{ marginBottom: '20px' }}>
                    <label>女方是否有房产:</label>
                    <Select value={femaleProperty ? '有房产' : '无房产'} onChange={(value) => setFemaleProperty(value === '有房产')} style={{ width: '100%' }}>
                      <Option value="无房产">无房产</Option>
                      <Option value="有房产">有房产</Option>
                    </Select>
                  </div>

                  {/* 女方家庭负担 */}
                  <div style={{ marginBottom: '20px' }}>
                    <label>女方家庭负担:</label>
                    <Select value={femaleFamilyBurden ? '有负担' : '无负担'} onChange={(value) => setFemaleFamilyBurden(value === '有负担')} style={{ width: '100%' }}>
                      <Option value="无负担">无负担</Option>
                      <Option value="有负担">有负担</Option>
                    </Select>
                  </div>
                </Col>
              </Row>

              {/* 彩礼基础金额 */}
              <div style={{ marginBottom: '20px' }}>
                <label>基础金额 (元):</label>
                <Input
                  type="number"
                  value={baseAmount}
                  onChange={(e) => setBaseAmount(parseInt(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              {/* 彩礼愿望比例 */}
              <div style={{ marginBottom: '20px' }}>
                <label>愿望彩礼金额比例 (%)：</label>
                <Slider
                  min={0}
                  max={100}
                  value={giftWish}
                  onChange={setGiftWish}
                  step={1}
                />
              </div>

              {/* 计算按钮 */}
              <Button
                type="primary"
                onClick={handleCalculate}
                block
                style={{ marginTop: '20px' }}
              >
                计算彩礼
              </Button>

              {/* 显示计算结果 */}
              {calculatedGift !== null && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <Title level={3}>最终彩礼金额：{calculatedGift.toFixed(2)} 元</Title>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;

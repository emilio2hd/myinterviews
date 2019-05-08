require 'rails_helper'

RSpec.describe Interview, type: :model do
  it { is_expected.to validate_presence_of(:at) }
  it { is_expected.to validate_presence_of(:type_of) }
  it { is_expected.to belong_to(:my_application) }
  it { is_expected.to validate_length_of(:interviewer_name).is_at_most(255) }
  it { is_expected.to validate_length_of(:interviewer_email).is_at_most(255) }
  it { is_expected.to define_enum_for(:type_of).with_values([:talk, :technical]) }

  context 'with valid data' do
    let(:application) { create(:application_sent) }
    let(:interview_attributes) { attributes_for(:talk_interview).merge(my_application_id: application.id) }

    subject { Interview.new(interview_attributes) }

    it 'should save successfully' do
      expect(subject.save).to be_truthy
    end
  end

  context 'with stale object' do
    let!(:interview) { create(:talk_interview) }
    let(:new_name) { FFaker::Name.name }

    before do
      @ob1 = Interview.find(interview.id)
      @ob2 = Interview.find(interview.id)
      @ob1.update(interviewer_name: new_name)
    end

    it 'should throw exception' do
      expect { @ob2.update(interviewer_name: new_name) }.to raise_error(ActiveRecord::StaleObjectError)
    end
  end
end

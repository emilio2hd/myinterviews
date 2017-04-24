require 'rails_helper'

RSpec.describe MyApplication, type: :model do
  it { is_expected.to validate_presence_of(:position) }
  it { is_expected.to validate_presence_of(:company) }
  it { is_expected.to validate_presence_of(:began_at) }
  it { is_expected.to validate_presence_of(:location) }
  it { is_expected.to validate_presence_of(:cv_url) }
  it { is_expected.to_not validate_presence_of(:job_description) }
  it { is_expected.to_not validate_presence_of(:cover_letter) }
  it { is_expected.to validate_length_of(:position).is_at_most(255) }
  it { is_expected.to validate_length_of(:company).is_at_most(255) }
  it { is_expected.to validate_length_of(:location).is_at_most(255) }
  it { is_expected.to validate_length_of(:cv_url).is_at_most(255) }
  it { is_expected.to define_enum_for(:status).with([:sent, :no_answer, :ongoing, :canceled, :accepted, :refused]) }

  context 'with valid data' do
    let(:application_attributes) { attributes_for(:application_sent) }

    subject { MyApplication.new(application_attributes) }

    it 'should save successfully' do
      expect(subject.save).to be_truthy
    end
  end

  context 'with stale object' do
    let!(:application) { create(:application_sent) }

    before do
      @ob1 = MyApplication.find(application.id)
      @ob2 = MyApplication.find(application.id)
      @ob1.update(position: 'New Position')
    end

    it 'should throw exception' do
      expect { @ob2.update(position: 'Other Position') }.to raise_error(ActiveRecord::StaleObjectError)
    end
  end
end
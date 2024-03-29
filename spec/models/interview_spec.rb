# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Interview, type: :model do
  it { is_expected.to validate_presence_of(:at) }
  it { is_expected.to belong_to(:my_application).optional }

  it { is_expected.to validate_length_of(:interviewer_name).is_at_most(255) }
  it { is_expected.to validate_length_of(:interviewer_email).is_at_most(255) }

  it { is_expected.to validate_presence_of(:type_of) }
  it { is_expected.to define_enum_for(:type_of).with_values(talk: 0, technical: 1) }

  context 'with valid data' do
    let(:application) { create(:application_sent) }
    let(:interview_attributes) { attributes_for(:talk_interview) }

    subject { Interview.new(interview_attributes) }

    it 'should save successfully' do
      expect(subject.save).to be_truthy
    end
  end
end
